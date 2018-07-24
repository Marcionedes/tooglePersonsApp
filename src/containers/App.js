import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Auxi';
import withClass from '../hoc/withClass';

export const AuthContext= React.createContext(false);

class App extends PureComponent {
  // dont use constructor, not necessary
  constructor (props){
    super(props);
    console.log('[App.js] Inside constructor', props);
    this.state =  {
      persons: [
        {id: '02n', name: 'Marcilene', age:28},
        {id: '01n', name: 'Marcia', age:28},
        {id: '03n', name: 'Marcio', age:30}
      ],
      otherState: 'Some value',
      showPersons: false, 
      toggleClicked: 0,
      authenticated: false
    };

  }

  componentWillMount() {

    console.log('[App.js] Inside componentWillMount()');

  }
  componentDidMount() {

    console.log('[App.js] Inside componentDidMount()');

  }

//   shouldComponentUpdate(nextProps, nextState){
//     console.log('[UPATE App.js] Inside shouldComponentUpdate', nextProps, nextState)
//     return nextState.persons !== this.state.persons||
//     nextState.showPersons !== this.state.showPersons;
// }

componentWillUpdate(nextProps, nextState){
    console.log('[UPDATE App.js], Inside componentWillUpdate',
    nextProps, nextState);

}

static getDerivedStateFromProps(nextProps, prevState){
  console.log('[UPDATE App.js], Inside getDerivedStateFromProps', 
  nextProps, prevState);

  return prevState;

}

getSnapshotBeforeUpdate () {
  console.log('[UPDATE App.js], Inside getSnapshotBeforeUpdate')

}

componentDidUpdate(nextProps, nextState){
  console.log('[UPDATE App.js], Inside componentDidUpdate', 
  nextProps, nextState);

}


  // state = {
  //   persons: [

  //     {id: '02n', name: 'Marcilene', age:29},
  //     {id: '01n', name: 'Marcia', age:28},
  //     {id: '03n', name: 'Marcio', age:30}
  //   ],
  //   otherState: 'Some value',
  //   showPersons: false
  // }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {return p.id === id});

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person; 

     this.setState ({persons: persons});
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
     const doesShow = this.state.showPersons;
     this.setState( (prevState, props) => {
       return {
        showPersons: !doesShow, 
        toggleClicked: prevState.toggleClicked + 1
       }
    });
  }

  loginHandler = () => {
     this.setState({authenticated: true}); 
  }

  render(){
    console.log('[App.js] Inside render')
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}/>;
        
         
    }
    let btnClass = classes.Button;
    return (
      <Aux>
      <button className={btnClass} onClick= {() => {this.setState({showPersons:true})}}>Show Persons</button>
      <Cockpit showPersons={this.state.showPersons}
      appTitle={this.props.title}
      persons={this.state.persons}
      login={this.loginHandler}
      clicked={this.togglePersonsHandler}/>
      <AuthContext.Provider value= {this.state.authenticated}>
      {persons}
      </AuthContext.Provider>
     </Aux>
    
    );
  }
}

export default withClass(App, classes.App);
