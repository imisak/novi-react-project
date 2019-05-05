import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Posts, PostsDetails } from "./components";
import './App.css';

export const App = () => (
  <BrowserRouter>
    <Switch>
      <Redirect exact from="/" to="/posts" />
      <Route exact path="/posts" component={Posts} />
      <Route path="/posts/:id" component={PostsDetails} />
    </Switch>
  </BrowserRouter>
);
