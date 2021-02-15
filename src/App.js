//import React, { Component } from 'react';
import React, { useState } from 'react';
import './App.css';
import Person from "./Person/Person";

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
  const [ personsState, setPersonState ] = useState({
    persons: [
      { id: 'k1', name: "Max", age: 23 },
      { id: 'k2', name: "MMMMM", age: 25 },
      { id: 'k3', name: "ZZZZZ", age: 27 }
    ],
    showPerson: false
  });

  const [otherState, setOtherState] = useState('some other state');

  const nameChangedHandler = (event) => {
    setPersonState({
      persons: [
        { name: "Max", age: 25 },
        { name: event.target.value, age: 25 },
        { name: "ZZ NAME", age: 27 }
      ]
    });
  };

  const togglePersonHandler = () => {
    const doesShow = personsState.showPerson;
    setPersonState({
      persons: personsState.persons,
      showPerson: !doesShow
    });
  };

  const deletePersonHandler = personIndex => {
    //const persons = personsState.persons.slice();
    const persons = [...personsState.persons];
    persons.splice(personIndex, 1);

    setPersonState({
      persons: persons,
      showPerson: personsState.showPerson
    })
  };

  const style = {
    backgroundColor: "white",
    font: "inherit",
    border: "1px solid blue",
    padding: "8px",
    cursor: "pointer"
  };

  let persons = null;

  if(personsState.showPerson) {
    persons = (
      <div>
        {personsState.persons.map((person, index) => {
          return <Person 
                    click={deletePersonHandler.bind(this, index)}
                    name={person.name} 
                    age={person.age}
                    key={person.id} />
        })}
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Empty Template</h1>
      <button 
        style={style}
        onClick={togglePersonHandler}>
          Toggle Person
      </button> 
      {persons}
    </div>
  );
}

export default App;