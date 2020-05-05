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
      redirect: false,
      fileName: "Select file"
    };
  }
  handleInputChange = e => {
    console.log(e.target.files[0]);
    this.setState({
      fileName: e.target.files[0].name,
      file: e.target.files[0]
    });
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
        <div style={{textAlign:"center"}}><h1>Upload file</h1></div>
        <div className={classes.fileUploadDiv}>
          {this.state.redirect ? <Redirect to="/files"></Redirect> : null}
          {this.state.error ? <p>some error occured while uploading</p> : null}
          <input
            id="file"
            type="file"
            onChange={this.handleInputChange}
            name="file"
            className={classes.fileInput}
            style={{ display: "none" }}
          ></input>
          <label className={classes.fileInput} for="file">
            {this.state.fileName}
            {/* <button >upl</button> */}
          </label>
          {/* <div className={classes.break}></div> */}
          <button className={classes.uploadBtn} onClick={this.handleSubmit}>
            Upload
          </button>
        </div>
      </>
    );
  }
}
