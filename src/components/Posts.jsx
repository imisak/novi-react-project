import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Posts extends Component {
  constructor() {
    super();

    this.state = {
      posts: undefined,
      currentPage: 1,
      postsPerPage: 5
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

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
    const { posts, currentPage, postsPerPage } = this.state;
    if (!posts) {
      return null;
    }
    // Logic for displaying posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const renderPosts = currentPosts.map((x, i) => (
      <ul key={i}>
        <li>ID: {x.id}</li>
        <li>UserID: {x.userId}</li>
        <li>Title: {x.title}</li>
        <li>Body: {x.body}</li>
        <li>
          <button>
            <Link to={`/posts/${x.id}`}>Details</Link>
          </button>
        </li>
      </ul>
    ));

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li key={number} id={number} onClick={this.handleClick}>
          {number}
        </li>
      );
    });

    return (
      <div className="wrapper">
        <h2>POSTS</h2>
        {renderPosts}
        <ul className="pagination" id="page-numbers">
          {renderPageNumbers}
        </ul>
      </div>
    );
  }
}
