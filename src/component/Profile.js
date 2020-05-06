import React, { Component } from "react";
import classes from "./Profile.module.css";
import axios from "axios";
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      editName: false,
      nameChange: false,
      btnLoading: false,
      error: false,
      errMessage: "",
      newPassword: "",
      editPass: false,
      passChange: false,
      passBtnLoading: false
    };
  }
  nameEditHandler = e => {
    this.setState({ editName: !this.state.editName, nameChange: true });
  };
  passwordEditHandler = e => {
    this.setState({ editPass: !this.state.editPass, passChange: true });
  };
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitNameChange = () => {
    if (this.state.name.trim() === "") {
      return;
    }
    if (this.state.name.trim().length > 20) {
      console.log(this.state.name.trim().length);
      this.setState({ error: true, errMessage: "Max allowed length 20" });
      return;
    } else {
      this.setState({ btnLoading: true, name: this.state.name.trim() });
      axios
        .post(
          "http://localhost:5000/changename",
          { newName: this.state.name },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        )
        .then(res => {
          this.props.setNameAtParent(this.state.name);
          this.setState({
            editName: false,
            nameChange: false,
            name: this.state.name,
            btnLoading: false,
            error: false
          });
        })
        .catch(err => console.log(err));
    }
  };
  submitPassChange = () => {
    if (this.state.newPassword.length === 0) {
      this.setState({ error: true, errMessage: "Password can not be empty" });
      return;
    }
    this.setState({ passBtnLoading: true });
    axios
      .post(
        "http://localhost:5000/changepassword",
        { newPassword: this.state.newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .then(res => {
        if (res.data.successful) {
          this.setState({
            editPass: false,
            passChange: false,
            passBtnLoading: false,
            error: false
          });
        } else {
          this.setState({
            error: true,
            passBtnLoading: false,
            errMessage: "Password not changed"
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleNameCancel = () => {
    this.setState({
      nameChange: false,
      editName: false,
      name: this.props.user.name
    });
  };
  handlePassCancel = () => {
    this.setState({
      passChange: false,
      editPass: false
      // name: this.props.user.name
    });
  };
  render() {
    return (
      <>
        <div style={{ textAlign: "center" }}>
          <h1>Profile</h1>
        </div>
        <div className={classes.profileContainer}>
          {/* <div className={classes.innerContainer}> */}
          {this.state.error ? (
            <p style={{ color: "red" }}>{this.state.errMessage}</p>
          ) : null}
          <div className={classes.innerContainer}>
            <h2>
              Name :{" "}
              <input
                name="name"
                value={this.state.name}
                style={{
                  borderBottom: this.state.editName
                    ? "1px solid rgba(0,0,0,0.3)"
                    : "0px"
                }}
                onChange={this.handleInputChange}
                autoFocus={true}
                readOnly={!this.state.editName}
              ></input>
            </h2>
            {!this.state.nameChange ? (
              <button
                className={classes.editBtn}
                onClick={this.nameEditHandler}
              >
                Edit
              </button>
            ) : (
              <div
                style={{ display: "flex", margin: "auto", marginRight: "5px" }}
              >
                <button
                  className={classes.editBtn}
                  onClick={this.submitNameChange}
                  style={{ borderColor: "blue" }}
                >
                  {this.state.btnLoading ? (
                    <img src={require("../images/loading.gif")}></img>
                  ) : (
                    "Save"
                  )}
                </button>
                <br></br>
                <button
                  className={classes.editBtn}
                  onClick={this.handleNameCancel}
                  style={{ borderColor: "blue" }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          {/* <hr></hr> */}
          <div className={classes.innerContainer}>
            <h2>Email: {this.props.user.email}</h2>
          </div>
          {/* <hr></hr> */}
          <div className={classes.innerContainer}>
            <h2>Total operations: 5</h2>
          </div>
          {/* <hr></hr> */}
          <div className={classes.innerContainer}>
            <h2>Available file count: {this.props.user.files.length}</h2>
          </div>
          <div className={classes.innerContainer}>
            <h2>
              Password :
              {this.state.passChange ? (
                <input
                  onChange={this.handleInputChange}
                  name="newPassword"
                  placeholder="new password"
                  type="password"
                  style={{transition:"1s all"}}
                ></input>
              ) : (
                <p style={{ margin: 0 }}>
                  &#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;
                </p>
              )}
            </h2>
            {!this.state.passChange ? (
              <button
                className={classes.editBtn}
                onClick={this.passwordEditHandler}
              >
                Edit
              </button>
            ) : (
              <div
                style={{ display: "flex", margin: "auto", marginRight: "5px" }}
              >
                <button
                  className={classes.editBtn}
                  onClick={this.submitPassChange}
                  style={{ borderColor: "blue" }}
                >
                  {this.state.passBtnLoading ? (
                    <img src={require("../images/loading.gif")}></img>
                  ) : (
                    "Save"
                  )}
                </button>
                <button
                  className={classes.editBtn}
                  onClick={this.handlePassCancel}
                  style={{ borderColor: "blue" }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}
