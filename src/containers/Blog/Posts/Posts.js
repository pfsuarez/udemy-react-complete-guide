import { Component } from "react"
import { Link } from "react-router-dom";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
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
        this.setState({ selectedPostId: id });
    }

    render() {
        let posts = this.state.posts.map(post => {
            console.log("PST", post);
            return (
                <Link to={'/' + post.id} key={post.id}>
                    <Post
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)} />
                </Link>);
        });

        console.log("POSTS", posts);
        return (
            <section className="Posts">
                {posts}
            </section>
        );
    }
}

export default Posts;
