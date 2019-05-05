import React, { Component } from "react";

export class PostsDetails extends Component {
  state = {
    posts: undefined,
    comments: undefined,
    details: undefined
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
        );
      fetch(`https://jsonplaceholder.typicode.com/users/${match.params.id}`)
        .then(response => response.json())
        .then(details =>
          this.setState({
            details
          })
        )
        .catch(error => console.log(error));
    }
  }

  render() {
    const { posts } = this.state;
    const { comments } = this.state;
    const { details } = this.state;

    return (
      <div className="wrapper">
        <h2>AUTHOR DETAILS</h2>
        {details ? (
          <ul>
            <li>Name: {details.name}</li>
            <li>Email: {details.email}</li>
            <li>
              Address: {details.address.street} {details.address.suite},{" "}
              {details.address.city}
            </li>
            <li>Phone: {details.phone}</li>
            <li>Company: {details.company.name}</li>
          </ul>
        ) : (
          <div className="loading error">Nema podataka o autoru...</div>
        )}
        <h2>POST</h2>
        {posts ? (
          <ul>
            <li>ID: {posts.id}</li>
            <li>Title: {posts.title}</li>
            <li>Body: {posts.body}</li>
          </ul>
        ) : (
          <div className="loading">Loading...</div>
        )}
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
