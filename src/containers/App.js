import React, { useState } from 'react';

import './App.css';

import Cockpit from '../components/Cockpit/Cockpit';
import Persons from "../components/Persons/Persons";

const App = props => {
  const [personsState, setPersonState] = useState({
    persons: [
      { id: 'k1', name: "Max", age: 23 },
      { id: 'k2', name: "MMMMM", age: 25 },
      { id: 'k3', name: "ZZZZZ", age: 27 }
    ],
    showPersons: false
  });

  const [otherState, setOtherState] = useState('some other state');

  const nameChangedHandler = (event, id) => {
    const personIndex = personsState.persons.findIndex(x => x.id === id);
    const person = {
      ...personsState.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...personsState.persons];
    persons[personIndex] = person;

    const state = { ...personsState, persons };

    setPersonState(state);
  };

  const togglePersonHandler = () => {
    const doesShow = personsState.showPersons;
    setPersonState({
      ...personsState,
      showPersons: !doesShow
    });
  };

  const deletePersonHandler = personIndex => {
    const persons = [...personsState.persons];
    persons.splice(personIndex, 1);

    setPersonState({
      ...personsState,
      persons
    })
  };

  let persons = null;

  if (personsState.showPersons) {
    persons = 
        <Persons 
          persons={personsState.persons}
          clicked={deletePersonHandler}
          changed={nameChangedHandler} />;
  }

  return (
    <div className="App">
      <Cockpit 
        title={props.appTitle}
        totalPersons={personsState.persons.length}
        showPersons={personsState.showPersons} 
        clicked={togglePersonHandler} />
      {persons}
    </div>
  );
}

export default App;