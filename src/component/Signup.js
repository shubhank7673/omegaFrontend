import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      error: false,
      redirect: false,
      errorText: ""
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSignup = () => {
    axios.post("http://localhost:5000/signup", this.state).then(res => {
      if (res.data.userExists === true) {
        this.setState({
          error: true,
          errorText: "user already exists with provided email"
        });
      } else if (res.data.error) {
        this.setState({
          error: true,
          errorText: "something went wrong"
        });
      } else {
        localStorage.setItem("token", res.data.token);
        let parentState = { ...this.props.parentState };
        parentState.loggedIn = true;
        this.setState({ redirect: true }, () =>
          this.props.resetParentState(parentState, "")
        );
      }
    });
  };
  render() {
    return (
      <>
        {this.state.redirect ? <Redirect to="/"></Redirect> : null}
        {this.state.error ? <h1>{this.state.errorText}</h1> : null}
        <input
          type="text"
          id="email"
          onChange={this.handleChange}
          value={this.state.email}
          name="email"
          placeholder="email"
        ></input>
        <input
          type="text"
          value={this.state.firstname}
          onChange={this.handleChange}
          name="name"
          placeholder="firstname"
        ></input>
        {/* <input
          type="text"
          value={this.state.lastname}
          onChange={this.handleChange}
          name="lastname"
          placeholder="lastname"
        ></input> */}
        <input
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
          name="password"
          placeholder="password"
        ></input>
        <button onClick={this.handleSignup}>signup</button>
      </>
    );
  }
}

export default Signup;
