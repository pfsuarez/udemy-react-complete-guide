import { Component } from "react"
import { Link, Route } from "react-router-dom";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import FullPost from "../FullPost/FullPost";
import "./Posts.css";

class Posts extends Component {
    state = {
        posts: []
    };

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Pipo'
                    }
                })
                this.setState({ posts: updatedPosts });
            })
            .catch(error => {
                console.log("Error:", error);
            });
    }

    postSelectedHandler = (id) => {
        //this.props.history.push({ pathname: '/posts/' + id })
        this.props.history.push('/posts/' + id)
    }

    render() {
        let posts = this.state.posts.map(post => {
            return (
                // <Link to={'/posts/' + post.id} >
                <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)} />);
            // </Link>);
        });

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;
