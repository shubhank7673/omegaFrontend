import React, { Component, useEffect } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import LandinPage from "./component/LandingPage";
import Login from "./component/Login";
import Home from "./component/Home";
import Logout from "./container/Logout";
import Signup from "./component/Signup";
import { PassThrough } from "stream";
import Graph from "./component/Dashboard";
import axios from "axios";
class app extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }
  resetState = (newState, newPath) => {
    this.setState(newState);
  };
  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ loggedIn: true });
    }
  }
  render() {
    const loggedInRoutes = (
      <>
        <Route path="/">
          <Home
            resetParentState={this.resetState}
            parentState={this.state}
          ></Home>
        </Route>
        <Route
          path="/logout"
          component={() => (
            <Logout
              parentState={this.state}
              resetParentState={this.resetState}
            ></Logout>
          )}
        ></Route>
      </>
    );
    const notLoggedRoutes = (
      <>
        <Route
          path="/"
          component={() => (
            <LandinPage
              parentState={this.state}
              resetParentState={this.resetState}
            ></LandinPage>
          )}
          exact
        ></Route>
        <Route
          path="/login"
          render={routerProps => (
            <Login
              {...routerProps}
              resetParentState={this.resetState}
              parentState={this.state}
            ></Login>
          )}
        ></Route>
        <Route
          path="/signup"
          component={() => (
            <Signup
              resetParentState={this.resetState}
              parentState={this.state}
            ></Signup>
          )}
        ></Route>
        <Route path="/"></Route>
      </>
    );
    return (
      <div>
        <BrowserRouter>
          <Switch>
            {!this.state.loggedIn ? notLoggedRoutes : loggedInRoutes}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default app;
