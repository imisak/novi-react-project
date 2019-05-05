import React, { Component } from "react";

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
      <div>
        {posts ? (
          posts.map((x, i) => (
            <ul key={i}>
            <li>POSTS</li>
              <li>ID:{x.id}</li>
              <li>UserID:{x.userId}</li>
              <li>Title:{x.title}</li>
              <li>Body:{x.body}</li>
            </ul>
          ))
        ) : (
          <div className="loading">Loading...</div>
        )}
      </div>
    );
  }
}
