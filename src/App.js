import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter, NavLink } from 'react-router-dom';

import "./App.css";

import Courses from './containers/Courses/Courses';
import Users from './containers/Users/Users';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <div className="App">
            <nav>
              <ul>
                <li>
                  <NavLink to="/courses" exact>Courses</NavLink>
                </li>
                <li>
                  <NavLink to="/Users" exact>Users</NavLink>
                </li>
              </ul>


            </nav>
            <Route path="/courses" component={Courses} />
            <Route path="/users" component={Users} />

            <ol style={{ textAlign: 'left' }}>
              <li>1: Add Routes to load "Users" and "Courses" on different pages (by entering a URL, without Links)</li>
              <li>2: Add a simple navigation with two links. One leading to "Users", one leading to "Courses"</li>
              <li>3: Make the courses in "Courses" clickable by adding a link and load the "Course" component in the place of "Courses" (without passing any data for now)</li>
              <li>4: Pass the course ID to the "Course" page and output it there</li>
              <li>5: Pass the course title to the "Course" page - pass it as a param or score bonus points by passing it as query params (you need to manually parse them though!)</li>
              <li>6: Load the "Course" component as a nested component of "Courses"</li>
              <li>Add a 404 error page and render it for any unknown routes</li>
              <li>Redirect requests to /all-courses to /courses (Your "Courses" page)</li>
            </ol>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;
