import React, {useState} from 'react';

import Validation from './Components/ValidationComponent';
import Char from "./Components/CharComponent";
import './App.css';

const App = props => {
  const [state, setState] = useState({
   userInput: ""
  });

  const inputChangedHandler = event => {
    const userInputValue = event.target.value;
    const currentState = {...state};

    currentState.userInput = userInputValue;
    setState(currentState);
  };

  const deleteCharHandler = charIndex => {
    const text = [...state.userInput];
    text.splice(charIndex, 1);
    const updatedText = text.join('');
    setState({
      userInput: updatedText
    });
  };

  let charList = [...state.userInput].map((letter, index) => {
    return <Char 
              letter={letter} 
              key={index}
              clicked={() => deleteCharHandler(index)} />
  });

  return (
    <div className="App">
      <h2>Section 04 - Assignment</h2>
      <input type="text" onChange={inputChangedHandler} value={state.userInput} />
      <p>{state.userInput}</p>
      <Validation textLength={state.userInput.length} />
      {charList}
    </div>
  );
};

export default App;
