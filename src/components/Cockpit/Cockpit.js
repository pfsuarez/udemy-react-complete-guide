import React, { useEffect, useRef } from 'react';
import styled from "styled-components";
import './Cockpit.css';

const StyledButton = styled.button`
  background-color: ${props => props.alt ? "red" : "green"};
  color: white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.alt ? "salmon" : "lightgreen"};
    color: black;
  }
`;

const Cockpit = props => {
    const toggleBtnRef = useRef(null);

    useEffect(() => {
        console.log("[Cockpit.js | useEffect]");

        // setTimeout(() => {
        //     alert('Saved data to Cloud!');
        // }, 1000);

        toggleBtnRef.current.click();

        return () => {
            console.log("[Cockpit.js | Cleanup work in useEffect]");
        }
    }, []); // [props.persons]


    const classes = [];
    if (props.totalPersons <= 2) {
        classes.push("red"); //classes = ["red"]
    }
    if (props.totalPersons <= 1) {
        classes.push("bold"); //classes = ["red", "bold"]
    }

    return (
        <div className="Cockpit">
            <h1>{props.title}</h1>
            <p className={classes.join(" ")}>This is really working!</p>
            <StyledButton
                alt={props.showPersons}
                onClick={props.clicked}
                ref={toggleBtnRef}
            >
                Toggle Person
            </StyledButton>
        </div>
    );
};

export default Cockpit;
