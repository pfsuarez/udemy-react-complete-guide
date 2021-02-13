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
      { name: "Max", age: 23 },
      { name: "MMMMM", age: 25 },
      { name: "ZZZZZ", age: 27 }
    ]
  });

  const [otherState, setOtherState] = useState('some other state');

  console.log(personsState, otherState);

  const switchNameHandler = (newName) => {
    setPersonState({
      persons: [
        { name: newName, age: 25 },
        { name: "MMMMM", age: 25 },
        { name: "ZZ NAME", age: 27 }
      ]
    });
  };

  const nameChangedHandler = (event) => {
    setPersonState({
      persons: [
        { name: "Max", age: 25 },
        { name: event.target.value, age: 25 },
        { name: "ZZ NAME", age: 27 }
      ]
    });
  }

  const style = {
    backgroundColor: "white",
    font: "inherit",
    border: "1px solid blue",
    padding: "8px",
    cursor: "pointer"
  };

  return (
    <div className="App">
      <h1>Empty Template</h1>
      <button 
        style={style}
        onClick={() => switchNameHandler("GGGGG NAME")}>
          Switch Name
      </button> 
      {/* DO NOT USE ARROW FUNCTION IT'S NOT EFFICIENT */}
      <Person 
        name={personsState.persons[0].name} 
        age={personsState.persons[0].age} />
      <Person 
        click={switchNameHandler.bind(this, "RRRR")}
        changed={nameChangedHandler}
        name={personsState.persons[1].name} 
        age={personsState.persons[1].age}>My Hobbies: Rugby
      </Person>
      <Person 
        name={personsState.persons[2].name} 
        age={personsState.persons[2].age} />
    </div>
  );
}

export default App;