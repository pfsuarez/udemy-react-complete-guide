// import React from 'react';
import Radium from "radium";
import "./Person.css";

const Person = (props) => {
    return (
        <div className="Person">
            <p onClick={props.click}>Name: {props.name} Age: {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name}></input>
        </div>
    );
}

export default Radium(Person);