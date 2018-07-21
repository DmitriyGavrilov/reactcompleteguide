import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';
import ErrorBoundery from './ErrorBoundary/ErrorBoundary';

class App extends Component {
  state = {
    persons: [
    { id: 'asfa1', name : 'Dmitriy', age: 28 },
    { id : 'vasdf1', name : 'Evgeniya', age: 28 }
    ], 
    otherState: 'some other value',
    showPersons: false
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    //const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( {persons: persons});
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
    }

  render() {
   let persons = null;
   let btnClass = '';

    if ( this.state.showPersons ) {
      persons = (
        <div >
          {this.state.persons.map((person, index) => {
            return <ErrorBoundery key={person.id}>
              <Person 
                click={() => this.deletePersonHandler(index)}
                name={person.name} 
                age={person.age}
                changed={(event) => this.nameChangeHandler(event, person.id)} />
            </ ErrorBoundery>
          })}
        </div> 
      );
      
      btnClass = classes.Red;
    }

    const assignedClasses = [];
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.red); //classes = ['red'] 
    } 
    if (this.state.persons.length <= 0) {
      assignedClasses.push(classes.bold); //classes = ['red', 'bold'] 
    } 


    return (
      <div className={classes.App}>
       <h1>Hi, I'm a React App</h1>
       <p className={assignedClasses.join(' ')}>This is realy working!</p>
       <button
          className={btnClass}
          onClick={this.togglePersonsHandler}>Toggle Persons</button> 
          {persons}
    </div>
    );
   // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, "Hi, I'm a React App!!!"));
  }
}

export default App;
