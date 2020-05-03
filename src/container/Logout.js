import React from "react";
import {Redirect} from "react-router-dom";
const Logout = props => {
  localStorage.removeItem("token");
  let parentState = { ...props.parentState };
  parentState.loggedIn = false;
  props.resetParentState(parentState, "/");
  return <Redirect to="/"></Redirect>
};

export default Logout;
