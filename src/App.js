import React, { useState } from 'react';
import styled from "styled-components";

import './App.css';
import Person from "./Person/Person";

const StyledButton = styled.button`
  background-color: ${props => props.alt ? "red" : "green"};
  color: white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.alt ? "salmon": "lightgreen"};
    color: black;
  }
`;

// BASED CLASS APP
// class App extends Component {
//   state = {
//     persons: [
//       { name: "Max", age: 23 },
//       { name: "MMMMM", age: 25 },
//       { name: "ZZZZZ", age: 27 }
//     ]
//   };

//   switchNameHandler = () => {
//     this.setState({
//       persons: [
//         { name: "Another name", age: 25 },
//         { name: "MMMMM", age: 25 },
//         { name: "ZZ NAME", age: 27 }
//       ]
//     });
//   };

//   render() {
//     return (
//       <div className="App">
//         <h1>Empty Template</h1>
//         <button onClick={this.switchNameHandler}>Switch Name</button>
//         <Person name={this.state.persons[0].name} age={this.state.persons[0].age} />
//         <Person name={this.state.persons[1].name} age={this.state.persons[1].age} />
//         <Person name={this.state.persons[2].name} age={this.state.persons[2].age} />
//       </div>
//     );
//   }
// }

//
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
      persons: personsState.persons,
      showPersons: !doesShow
    });
  };

  const deletePersonHandler = personIndex => {
    //const persons = personsState.persons.slice();
    const persons = [...personsState.persons];
    persons.splice(personIndex, 1);

    setPersonState({
      persons: persons,
      showPersons: personsState.showPersons
    })
  };

  let persons = null;

  if (personsState.showPersons) {
    persons = (
      <div>
        {personsState.persons.map((person, index) => {
          return <Person
            click={deletePersonHandler.bind(this, index)}
            name={person.name}
            age={person.age}
            key={person.id}
            changed={(event) => nameChangedHandler(event, person.id)} />
        })}
      </div>
    );
  }

  const classes = [];
  if(personsState.persons.length <= 2) {
    classes.push("red"); //classes = ["red"]
  }
  if(personsState.persons.length <= 1) {
    classes.push("bold"); //classes = ["red", "bold"]
  }

  return (
    <div className="App">
      <h1>Hi, I'm a React App</h1>
      <p className={classes.join(" ")}>This is really working!</p>
      <StyledButton
        alt={personsState.showPersons}
        onClick={togglePersonHandler}>
        Toggle Person
      </StyledButton>
      {persons}
    </div>
  );
}

export default App;