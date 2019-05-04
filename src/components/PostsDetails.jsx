import React, { Component } from "react";

export class PostsDetails extends Component {
  state = {
    posts: undefined,
    comments: undefined
  };

  componentDidMount() {
    const { match } = this.props;

    if (match && match.params.id) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${match.params.id}`)
        .then(response => response.json())
        .then(posts =>
          this.setState({
            posts
          }))
          .then(() => fetch(`https://jsonplaceholder.typicode.com/comments?postId=${match.params.id}`))
        .then(response => response.json())
        .then(comments =>
          this.setState({
            comments
          }))    
          .catch(error => console.log(error));
        }
  }

  render() {
    const { posts } = this.state;
    const { comments } = this.state;

    console.log(posts);
    console.log(comments);
    return <div />;
  }
}
