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
    return <div />;
  }
}
