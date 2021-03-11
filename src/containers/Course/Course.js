import React, { Component } from 'react';

class Course extends Component {
    state = {
        title: null
    };

    componentDidMount() {
        console.log("", this.props);
        const searchParams = new URLSearchParams(this.props.location.search);

        const title = searchParams.getAll("course-title");

        this.setState({title});
    }
    render() {
        return (
            <div>
                <h1>{this.state.title ? this.state.title : "NO TITLE"}</h1>
                <p>You selected the Course with ID: {this.props.match.params.id}</p>
            </div>
        );
    }
}

export default Course;