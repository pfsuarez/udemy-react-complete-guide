import React, { Component, Suspense } from 'react';
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import Posts from "./Posts/Posts";
//import NewPost from "./NewPost/NewPost";
import asyncComponent from "../../hoc/asyncComponent";
import './Blog.css';

const AsyncNewPost = asyncComponent(() => {
    return import("./NewPost/NewPost");
});

const NewPost = React.lazy(() => import("./NewPost/NewPost"));

class Blog extends Component {
    state = {
        auth: true
    };

    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/posts"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>Posts</NavLink></li>
                            <li><NavLink to={
                                {
                                    pathname: '/new-post',
                                    hash: '#submit',
                                    search: '?quick-submit=true'
                                }
                            }>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <h1>Home</h1>} /> */}
                {/* <Switch> */}
                {/* {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null} */}
                {/* <Route path="/new-post" component={AsyncNewPost} /> */}
                <React.Fragment>
                    <Route path="/new-post" render={() => {
                        <Suspense fallback={<div>Loading...</div>}>
                            <NewPost />
                        </Suspense>
                    }} />
                    <Route path="/posts" component={Posts} />
                </React.Fragment>

                {/* <Redirect from="/" to="/posts" /> */}
                {/* <Route render={() => <h1>Not Found</h1>} /> */}
                {/* </Switch> */}
            </div>
        );
    }
}

export default Blog;