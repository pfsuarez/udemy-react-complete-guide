// import React from 'react';
import Radium from "radium";
import "./Person.css";

const Person = (props) => {
    const style = {
        "@media (min-width: 500px)" : {
            width:"400px"
        }
    };

    return (
        <div className="Person" style={style}>
            <p onClick={props.click}>Name: {props.name} Age: {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name}></input>
        </div>
    );
}

export default Radium(Person);