import React, { Component } from 'react';

import './App.css';

import Cockpit from '../components/Cockpit/Cockpit';
import Persons from "../components/Persons/Persons";

class App extends Component {
  constructor(props) {
    super(props);
    console.log("[App.js | Constructor}");
  }

  state = {
    persons: [
      { id: 'k1', name: "Max", age: 23 },
      { id: 'k2', name: "MMMMM", age: 25 },
      { id: 'k3', name: "ZZZZZ", age: 27 }
    ],
    showPersons: false
  };

  static getDerivedStateFromProps(props, state) {
    console.log("[App.js | getDerivedStateFromProps]", props);
    return state;
  }

  componentDidMount() {
    console.log("[App.js | ComponentDidMount]");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[App.js | shouldComponentUpdate]");
    return true;
  }

  // getSnapshotBeforeUpdate(prevProps, prevState) {

  // }

  componentDidUpdate() {
    console.log("[App.js | componentDidUpdate]");
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(x => x.id === id);
    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    const state = { ...this.state, persons };

    this.setState(state);
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      ...this.state,
      showPersons: !doesShow
    });
  }

  deletePersonHandler = personIndex => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);

    this.setState({
      ...this.state,
      persons
    })
  }

  render() {
    console.log("[App.js | Render]");
    let persons = null;

    if (this.state.showPersons) {
      persons =
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler} />;
    }

    return (
      <div className="App">
        <Cockpit
          title={this.props.appTitle}
          totalPersons={this.state.persons.length}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonHandler} />
        {persons}
      </div>
    );
  }
}

// const App = props => {
//   const [personsState, setPersonState] = useState({
//     persons: [
//       { id: 'k1', name: "Max", age: 23 },
//       { id: 'k2', name: "MMMMM", age: 25 },
//       { id: 'k3', name: "ZZZZZ", age: 27 }
//     ],
//     showPersons: false
//   });

//   const [otherState, setOtherState] = useState('some other state');

//   const nameChangedHandler = (event, id) => {
//     const personIndex = personsState.persons.findIndex(x => x.id === id);
//     const person = {
//       ...personsState.persons[personIndex]
//     };

//     person.name = event.target.value;

//     const persons = [...personsState.persons];
//     persons[personIndex] = person;

//     const state = { ...personsState, persons };

//     setPersonState(state);
//   };

//   const togglePersonHandler = () => {
//     const doesShow = personsState.showPersons;
//     setPersonState({
//       ...personsState,
//       showPersons: !doesShow
//     });
//   };

//   const deletePersonHandler = personIndex => {
//     const persons = [...personsState.persons];
//     persons.splice(personIndex, 1);

//     setPersonState({
//       ...personsState,
//       persons
//     })
//   };

//   let persons = null;

//   if (personsState.showPersons) {
//     persons = 
//         <Persons 
//           persons={personsState.persons}
//           clicked={deletePersonHandler}
//           changed={nameChangedHandler} />;
//   }

//   return (
//     <div className="App">
//       <Cockpit 
//         title={props.appTitle}
//         totalPersons={personsState.persons.length}
//         showPersons={personsState.showPersons} 
//         clicked={togglePersonHandler} />
//       {persons}
//     </div>
//   );
// }

export default App;