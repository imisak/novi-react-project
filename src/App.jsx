import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Posts, PostsDetails } from "./components";

export const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/posts" component={Posts} />
      <Route path="/posts/:id" component={PostsDetails} />
    </Switch>
  </BrowserRouter>
);
