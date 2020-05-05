import React from "react";
import { Line } from "react-chartjs-2";
import { black, red } from "color-name";
import classes from "./Dashboard.module.css";
import axios from "axios";
export default class Dashboard extends React.Component {
  setGradient = canvas => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(255,255,255,0.3)");
    gradient.addColorStop(0.3, "rgba(255,255,255,0.1)");
    gradient.addColorStop(0.5, "rgba(255,255,255,0)");
    return gradient;
  };
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      todayOps: { delete: 0, upload: 0, download: 0 }
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/getuser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        let labels = [];
        let totalOpEachDay = [];
        res.data.user.operations.forEach(item => {
          labels.push(item.day);
          totalOpEachDay.push(item.delete + item.upload + item.download);
        });
        const tdata =
          res.data.user.operations[res.data.user.operations.length - 1];
        const todayOps = {
          delete: tdata.delete,
          upload: tdata.upload,
          download: tdata.download
        };
        this.setState({
          data: {
            labels: labels,
            datasets: [
              {
                lineTension: 0.3,
                label: "Operations",
                backgroundColor: "rgba(0,0,0,0)",
                borderColor: "#1C2833",
                borderWidth: 2,
                pointBackgroundColor: "rgba(23, 58, 99,1)",
                pointBorderWidth: "1",
                pointRadius: 5,
                // steppedLine:false,
                data: totalOpEachDay
              }
            ]
          },
          todayOps
        });
      })
      .catch(err => console.log(err));
  }
  getCharData = canvas => {
    const data = this.state.data;
    if (data.datasets) {
      data.datasets[0].backgroundColor = this.setGradient(canvas);
    }
    console.log(data.datasets);
    return data;
  };
  render() {
    return (
      <>
        <div style={{ textAlign: "center" }}>
          <h1>Monthly Usage</h1>
        </div>
        <div
          style={{
            position: "relative",
            width: "calc(100% - 0)",
            height: 300,
            // background:"linear-gradient(rgba(23, 58, 99,1),transparent)",
            backgroundColor: "#fff", //"rgba(23, 58, 99,0)",
            padding: "30px",
            margin: "10px",
            boxShadow: "0px 0px 20px rgba(0,0,0,0.3)",
            borderRadius: "15px"
          }}
          className={classes.graphContainer}
        >
          <Line
            options={{
              responsive: true,
              legend: {
                display: false
              },
              title: {
                display: true,
                text: "Monthly usage"
              },
              maintainAspectRatio: false,
              scales: {
                xAxes: [
                  {
                    gridLines: { color: "rgba(0,0,0,0)" },
                    ticks: {
                      //   beginAtZero: true,
                      //   fontColor: "rgba(255,255,255,0.5)"
                    }
                  }
                ],
                yAxes: [
                  {
                    gridLines: { color: "rgba(0,0,0,0.2)" }
                  }
                ]
              }
            }}
            data={this.getCharData}
          />
        </div>
        <div className={classes.todaystats}>
          <h1>Today's Usage</h1>
          <div className={classes.innerItem}>
            <img
              className={classes.innerIcon}
              src={require("../images/downloads.png")}
            ></img>
            <h1>{this.state.todayOps.download}</h1>
            <h4>Downloads</h4>
          </div>
          <div className={classes.innerItem}>
            <img
              className={classes.innerIcon}
              src={require("../images/upload.png")}
            ></img>
            <h1>{this.state.todayOps.upload}</h1>
            <h4>Uploads</h4>
          </div>
          <div className={classes.innerItem}>
            <img
              className={classes.innerIcon}
              src={require("../images/delete.png")}
            ></img>
            <h1>{this.state.todayOps.delete}</h1>
            <h4>Deletions</h4>
          </div>
        </div>
      </>
    );
  }
}
