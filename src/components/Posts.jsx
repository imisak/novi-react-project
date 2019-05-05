import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Pagination } from './components';

export class Posts extends Component {
  state = {
    posts: undefined
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(posts =>
        this.setState({
          posts
        })
      )
      .catch(error => console.log(error));
  }

  render() {
    const { posts } = this.state;

    console.log(posts);
    return (
      <div className='wrapper'>
        <h2>POSTS</h2>
        {posts ? (
          posts.map((x, i) => (
            <ul key={i}>
              <li>ID:{x.id}</li>
              <li>UserID:{x.userId}</li>
              <li>Title:{x.title}</li>
              <li>Body:{x.body}</li>
              <li><button>
                <Link to={`/posts/${x.id}`}>Details</Link></button>
              </li>
            </ul>
          ))
        ) : (
          <div className="loading">Loading...</div>
        )}
      </div>
    );
  }
}
