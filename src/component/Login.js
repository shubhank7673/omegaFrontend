import React from "react";
import axios from "axios";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirect: false,
      errorLogginIn: false
    };
  }
  changeEmail = e => {
    this.setState({ email: e.target.value });
    // console.log(this.state.email);
  };
  changePassword = e => {
    this.setState({ password: e.target.value });
    // console.log(this.state.password);
  };
  handleSubmit = () => {
    axios
      .post("http://localhost:5000/login", this.state)
      .then(res => {
        if (res.data.userFound && res.data.correctPassword) {
          console.log(res.data.token);
          localStorage.setItem("token", res.data.token);
          let parentState = { ...this.props.parentState };
          parentState.loggedIn = true;
          this.props.history.push("/dashboard");
          this.props.resetParentState(parentState, "/");
        } else {
          this.setState({ errorLogginIn: true });
        }
      })
      .catch(err => console.log(err));
  };
  render() {
    // localStorage.setItem("token","token");
    return (
      <>
        {this.state.errorLogginIn ? (
          <h1>incorrect username or password</h1>
        ) : null}
        <input
          type="email"
          placeholder="email"
          name="email"
          value={this.state.email}
          onChange={this.changeEmail}
        ></input>
        <input
          type="password"
          placeholder="password"
          value={this.state.password}
          name="password"
          onChange={this.changePassword}
        ></input>
        <button onClick={this.handleSubmit}>submit</button>
      </>
    );
  }
}
export default Login;
