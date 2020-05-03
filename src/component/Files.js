import React, { Component } from "react";
import axios from "axios";
import classes from "./Files.module.css";
import FileItem from "../container/FileItem";
class Files extends Component {
  constructor(props) {
    super(props);
    this.state = { files: [] };
  }
  makeItems = () => {
    console.log(this.state.files)
    const x = this.state.files.map(item => {
      return <FileItem item={item}></FileItem>;
    })
    return x;
  }
  componentWillMount() {
    axios
      .post("http://localhost:5000/getuserfiles", {
        email: "shubhank7673@gmail.com"
      })
      .then(res => {
        console.log(res.data);
        this.setState({ files: res.data.userFiles });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <>
        <div className={classes.filesContainer}>
          {this.makeItems()}
        </div>
      </>
    );
  }
}
export default Files;
