import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "./Pagination";

export class Posts extends Component {
  state = {
    posts: undefined,
    totalCount: 0,
    currentPage: 1,
    itemsPerPage: 5
  };

  setPage = event => {
    const { value } = event.target;
    this.setState({
      currentPage: parseInt(value)
    });
  };

  setTotalCount = posts => {
    this.setState({
      totalCount: posts.length
    });
  };

  componentDidMount() {
    const { posts } = this.props;
    if (posts) {
      this.setTotalCount(posts);
    }

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(posts =>
        this.setState({
          posts
        })
      )
      .catch(error => console.log(error));
  }

  componentWillUpdate(nextProps) {
    const { posts } = this.props;

    if (posts !== nextProps.posts) {
      this.setTotalCount(nextProps.posts);
    }
  }

  renderItem = ({ id, title }) => (
    <div key={id}>
      <Link to={`/posts/${id}`}>{title}</Link>
    </div>
  );

  render() {
    const { posts } = this.state;

    const { itemsPerPage, currentPage } = this.state;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pagedTodos = posts.slice(startIndex, endIndex);

    return (
      <div className="wrapper">
        <h2>POSTS</h2>
        {posts ? (
          posts.map((x, i) => (
            <ul key={i}>
              <li>ID:{x.id}</li>
              <li>UserID:{x.userId}</li>
              <li>Title:{x.title}</li>
              <li>Body:{x.body}</li>
              <li>
                <button>
                  <Link to={`/posts/${x.id}`}>Details</Link>
                </button>
              </li>
            </ul>
          ))
        ) : (
          <div className="loading">Loading...</div>
        )}

        {pagedTodos.map(item => this.renderItem(item))}
        <Pagination {...this.state} setPage={this.setPage} />
      </div>
    );
  }
}
