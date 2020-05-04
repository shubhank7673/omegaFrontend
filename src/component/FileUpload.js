import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { FileDrop } from "react-file-drop";
import classes from "./FileUpload.module.css";
export default class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      error: false,
      redirect: false
    };
  }
  handleInputChange = e => {
    console.log(e.target.files[0]);
    this.setState({ file: e.target.files[0] });
  };
  handleSubmit = () => {
    const data = new FormData();
    data.append("file", this.state.file);
    console.log(localStorage.getItem("token"));
    axios
      .post("http://localhost:5000/fileupload", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token").toString()
        }
      })
      .then(res => {
        if (res.data.successful) {
          //   this.props.history.push("/dashboard");
          this.setState({ redirect: true });
        } else {
          this.setState({ error: true });
        }
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <>
        {this.state.redirect ? <Redirect to="/files"></Redirect> : null}
        {this.state.error ? <p>some error occured while uploading</p> : null}
        <input
          type="file"
          onChange={this.handleInputChange}
          name="file"
          className={classes.fileInput}
        ></input>
        <button onClick={this.handleSubmit}>Upload</button>
      </>
    );
  }
}
