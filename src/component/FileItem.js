import React from "react";
import classes from "./FileItem.module.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
// import def from "../images/defualt.png";
export default class FileItem extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.item.extension);
    this.state = {
      shared: this.props.item.shared,
      extpath: "",
      copied: false,
      redirect: false,
      display: "inlineBlock",
      serverName: this.props.item.serverName
    };
  }
  handerChange = e => {
    this.eval = e.target.checked;
    axios
      .get(`http://localhost:5000/changefilestatus/${this.state.serverName}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        if (res.data.successful) {
          console.log(res.data.newServerName);
          this.setState({
            shared: this.eval,
            serverName: res.data.newServerName
          });
        }
      })
      .catch(err => console.log(err));
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
  handleDeleteClick = () => {
    console.log(this.props.item.serverName);
    axios
      .post(
        "http://localhost:5000/filedelete",
        {
          fileId: this.state.serverName
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token").toString()
          }
        }
      )
      .then(res => {
        console.log(res.data);
        if (res.data.successful) {
          console.log("inside\n");
          this.setState({ display: "none" });
        }
      })
      .catch(err => console.log(err));
  };
  handleCopyClick = () => {
    navigator.clipboard.writeText(
      `http://localhost:5000/filedownload/${this.state.serverName}-${this.props.item.extension}`
    );
    setTimeout(() => {
      this.setState({ copied: false });
    }, 5000);
    this.setState({ copied: true });
  };
  handleDownloadClick = () => {
    axios.get(
      `http://localhost:5000/privatedownload/${this.state.serverName}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
    .then((res) => {})
    .catch(err => console.log(err));
  };
  render() {
    console.log(this.props.item.serverName);
    return (
      <>
        <div
          className={classes.fileItem}
          style={{ display: this.state.display }}
        >
          <div className={classes.icon}>
            <img src={this.state.extpath} width="100" height="100"></img>
          </div>
          <div
            className={classes.fileInfo}
            style={{
              overflow: "hidden",
              background: "#EAECEE"
            }}
          >
            <p title={this.props.item.fullName}>{this.props.item.clientName}</p>
            <div className={classes.controlsDiv}>
              {/* shared{"  "} */}
              <label
                title={this.state.shared ? "Public" : "Private"}
                className={classes.switch}
              >
                <input
                  onChange={this.handerChange}
                  checked={this.state.shared}
                  type="checkbox"
                />
                <span
                  className={`${classes.slider.toString()} ${classes.round.toString()}`}
                ></span>
              </label>
              {this.state.shared ? (
                <button
                  title={this.state.copied ? "copied" : "copy"}
                  onClick={this.handleCopyClick}
                  style={{ marginRight: "0px" }}
                  className={classes.innerBtn}
                >
                  <img
                    src={require(`../images/${
                      this.state.copied ? "copied" : "copy"
                    }.png`)}
                  ></img>
                </button>
              ) : null}
              <button
                title={"delete"}
                style={{ marginRight: "0px" }}
                onClick={this.handleDeleteClick}
                className={classes.innerBtn}
              >
                <img src={require("../images/delete.png")}></img>
              </button>
              <button
                title={"Download"}
                onClick={this.handleDownloadClick}
                className={classes.innerBtn}
              >
                <img src={require("../images/download.png")}></img>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
