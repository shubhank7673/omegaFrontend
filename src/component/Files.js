import React, { Component } from "react";
import axios from "axios";
import classes from "./Files.module.css";
import FileItem from "./FileItem";
import Loading from "../container/Loading";
class Files extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: this.props.user.files,
      reload: false,
      loading: false
    };
  }
  makeItems = () => {
    console.log(this.state.files);
    const x = this.state.files.map(item => {
      return <FileItem item={item}></FileItem>;
    });
    return x;
  };
  componentDidMount() {}
  render() {
    return (
      <>
        {this.state.loading ? (
          <Loading message={"Files loading"}></Loading>
        ) : (
          <div>
            <h1>Files</h1>
            <div className={classes.filesContainer}>{this.makeItems()}</div>
          </div>
        )}
      </>
    );
  }
}
export default Files;
