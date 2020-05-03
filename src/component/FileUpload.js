import React from "react";
import axios from "axios";
export default class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      error: false
    };
  }
  handleInputChange = e => {
    console.log(e.target.files[0]);
    this.setState({ file: e.target.files[0] });
  };
  handleSubmit = () => {
    const data = new FormData();
    data.append('file',this.state.file);
    axios
      .post("http://localhost:5000/fileupload", data)
      .then(res => {
        if (res.data.successful) {
          this.props.history.push("/dashboard");
        } else {
          this.setState({ error: true });
        }
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <>
        {this.state.error ? <p>some error occured while uploading</p> : null}
        <input
          type="file"
          onChange={this.handleInputChange}
          name="file"
        ></input>
        <button onClick={this.handleSubmit}>Upload</button>
      </>
    );
  }
}
