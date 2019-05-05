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
          })
        )
        .then(() =>
          fetch(
            `https://jsonplaceholder.typicode.com/comments?postId=${
              match.params.id
            }`
          )
        )
        .then(response => response.json())
        .then(comments =>
          this.setState({
            comments
          })
        )
        .catch(error => console.log(error));
    }
  }

  render() {
    const { posts } = this.state;
    const { comments } = this.state;
    console.log(posts);
    return (
      <div>
        <h2>POST</h2>
{/*         {posts ? (
          posts.map((x, i) => (
            <ul key={i}>
              <li>email: {x.email}</li>
              <li>Name: {x.name}</li>
              <li>Body: {x.body}</li>
            </ul>
          ))
        ) : (
          <div className="loading">Loading...</div>
        )} */}
        <h2>COMMENTS</h2>
        {comments ? (
          comments.map((x, i) => (
            <ul key={i}>
              <li>email: {x.email}</li>
              <li>Name: {x.name}</li>
              <li>Body: {x.body}</li>
            </ul>
          ))
        ) : (
          <div className="loading">Loading...</div>
        )}
      </div>
    );
  }
}
