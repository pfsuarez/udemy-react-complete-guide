import React, { Component, Fragment } from 'react';
import styled from "styled-components";
import Aux from "../../../hoc/Auxiliary";
import withClass from '../../../hoc/WithClass';

const StyleDiv = styled.div`
        width:60%;
        margin: 16px auto;
        border: 1px solid #eee;
        box-shadow: 0 2px 3px #ccc;
        padding: 16px;
        text-align: center;

        @media (min-width: 500px) {
            width: 200px;
        }
`;

class Person extends Component {
    // static getDerivedStateFromProps(props, state) {
    //     console.log("[Person.js | getDerivedStateFromProps]", props);
    //     return state;
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log("[Person.js | shouldComponentUpdate]", nextProps);
    //     return true;
    // }

    // getSnapshotBeforeUpdate(prevProps, prevState) {
    //     console.log("[Person.js | getSnapshotBeforeUpdate]", prevProps);
    // }

    // componentDidUpdate() {
    //     console.log("[Person.js | componentDidUpdate]", prevProps);
    // }

    render() {
        const style = {
            "@media (min-width: 500px)": {
                width: "400px"
            }
        };

        console.log("[Person.js | Rendering...]");
        return (
            <Fragment>
                <p onClick={this.props.click}>Name: {this.props.name} Age: {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.changed} value={this.props.name}></input>
            </Fragment>
        );
    }
}

export default withClass(Person, "");