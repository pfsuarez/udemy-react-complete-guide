import React, { Component } from 'react';
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
    background-color: ${props => props.alt ? "salmon": "lightgreen"};
    color: black;
  }
`;

class Cockpit extends Component {
    render() {
        const classes = [];
        if(this.props.totalPersons <= 2) {
            classes.push("red"); //classes = ["red"]
        }
        if(this.props.totalPersons <= 1) {
            classes.push("bold"); //classes = ["red", "bold"]
        }
    
        return (
            <div className="Cockpit">
                <h1>{this.props.title}</h1>
                <p className={classes.join(" ")}>This is really working!</p>
                <StyledButton
                    alt={this.props.showPersons}
                    onClick={this.props.clicked}>
                    Toggle Person
                </StyledButton>
            </div>
        );
    }
};

export default Cockpit;
