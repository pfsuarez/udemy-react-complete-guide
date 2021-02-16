import React, { Component } from 'react';

import Person from './Person/Person';

class Persons extends Component {
    static getDerivedStateFromProps(props, state) {
        console.log("[Persons.js | getDerivedStateFromProps]", props);
        return state;
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("[Persons.js | shouldComponentUpdate]", nextProps);
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("[Persons.js | getSnapshotBeforeUpdate]", prevProps);
    }

    componentDidUpdate() {
        console.log("[Persons.js | componentDidUpdate]");
    }

    componentWillUnmount() {
        console.log("[Persons.js | componentWilUnmount]");
    }

    render() {
        console.log("[Persons.js | Rendering...]");
        return (
            this.props.persons.map((person, index) => {
                return <Person
                    click={() => this.props.clicked(index)}
                    name={person.name}
                    age={person.age}
                    key={person.id}
                    changed={(event) => this.props.changed(event, person.id)} />
            })
        );
    };
}

export default Persons;