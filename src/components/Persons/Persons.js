import React, { PureComponent } from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {

    constructor (props){
        super(props);
        console.log('[Persons.js] Inside constructor', props);
      }
    
      componentWillMount() {
        console.log('[Persons.js] Inside componentWillMount()');
        this.lastPersonRef = React.createRef();
    
      }
      componentDidMount() {
        console.log('[Persons.js] Inside componentDidMount()');
        this.lastPersonRef.current.focus();
    
      }

      componentWillReceiveProps(nextProps) {
          console.log('UPDATE Persons.js] Inside componentReceiveProps', nextProps)
      }

    //   shouldComponentUpdate(nextProps, nextState){
    //       console.log('[UPATE Persons.js] Inside shouldComponentUpdate', nextProps, nextState)
    //       return nextProps.persons !== this.props.persons ||
    //       nextProps.changed !== this.props.changed ||
    //       nextProps.clicked !== this.props.chicked;
    //    // return true;
    //   }

      componentWillUpdate(nextProps, nextState){
          console.log('[UPDATE Persons.js], Inside componentWillUpdate', nextProps, nextState);

      }

      componentDidUpdate(nextProps, nextState){
        console.log('[UPDATE Persons.js], Inside componentDidUpdate', nextProps, nextState);

    }

    render () {
        console.log('[Persons.js] Inside render()');
        return  this.props.persons.map((person, index) => {
            return <Person 
            click= {() => this.props.clicked(index)} 
            name={person.name}
            position= {index}
            age={person.age}
            ref={this.lastPersonRef}
            key={person.id}
            changed={(event) => this.props.changed(event, person.id)}/>
        });
    }

}

export default Persons;