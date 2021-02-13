import React, {useState} from "react";

import './App.css';
import UserInput from "./Components/UserInput/UserInput";
import UserOutput from "./Components/UserOutput/UserOutput";

const App = () => {
  const [usersState, setUsersState] = useState({
    users: [
      {
        userName: "U1"
      },
      {
        userName: "U2"
      },
      {
        userName: "U3"
      }
    ]
  });

  const userInputChanged = (event) => {
    setUsersState({
      users: [
        {
          userName: event.target.value
        },
        {
          userName: "U2"
        },
        {
          userName: "U3"
        }
      ]
    });
  }

  return (
    <div className="App">
      <h2>Section 03 - Assignment</h2>
      <UserInput changed={userInputChanged} text={usersState.users[0].userName}></UserInput>
      
      <UserOutput userName={usersState.users[0].userName}></UserOutput>
      <UserOutput userName={usersState.users[1].userName}></UserOutput>
      <UserOutput userName={usersState.users[2].userName}></UserOutput>
    </div>
  );
}

export default App;
