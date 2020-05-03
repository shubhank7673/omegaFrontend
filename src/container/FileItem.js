import React from "react";
import classes from "./FileItem.module.css";
// import def from "../images/defualt.png";
export default class FileItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shared: false,
      extpath: ""
    };
  }
  handerChange = e => {
    this.setState({ shared: e.target.checked });
  };
  componentWillMount() {
    let extpath = "";
    try {
      extpath = require(`../images/extensions/${this.props.item.extension}.png`);
    } catch (err) {
      extpath = require("../images/extensions/default.png");
    }
    this.setState({ extpath });
  }
  render() {
    return (
      <div className={classes.fileItem}>
        <div className={classes.icon}>
          <img src={this.state.extpath} width="100" height="100"></img>
        </div>
        <div
          className={classes.fileInfo}
          style={{
            overflow: "hidden",
            background: this.state.shared
              ? "rgba(0,255,0,0.5)"
              : "rgba(0,0,255,0.5)"
          }}
        >
          <p>{this.props.item.clientName}</p>
          <div style={{ justifyContent: "center" }}>
            shared{"  "}
            <label className={classes.switch}>
              <input onChange={this.handerChange} type="checkbox" />
              <span
                className={`${classes.slider.toString()} ${classes.round.toString()}`}
              ></span>
            </label>
            {this.state.shared ? <button>copy link</button> : null}
          </div>
        </div>
      </div>
    );
  }
}
// export default FileItem;
