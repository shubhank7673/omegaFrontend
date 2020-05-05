import React from "react";
import axios from "axios";
import Logout from "../container/Logout";
import { Link } from "react-router-dom";
import Files from "./Files";
import sclass from "./Sidebar.module.css";
import { Sidebar, SidebarItem } from "react-responsive-sidebar";
import Dashboard from "./Dashboard";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import FileUpload from "./FileUpload";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sidebarOpen: true };
  }
  logout = () => {
    console.log("clicked!!");
  };
  toggleSidebar = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  };
  render() {
    // const match = useRouteMatch();
    const items = [
      <div>
        <SidebarItem hoverHighlight="rgba(255,255,255,0)">
          <div className={sclass.avatarHolder}>
            <div className={sclass.avatar}>
              <h1>S</h1>
            </div>
            <p>shubhank khare</p>
          </div>
        </SidebarItem>
      </div>,
      <div className={sclass.sidebarItemContainer}>
        <SidebarItem href="/profile" textAlign="center">
          <div className={sclass.sidebarLink}>Profile</div>
        </SidebarItem>
      </div>,
      <div className={sclass.sidebarItemContainer}>
        <SidebarItem href="/" textAlign="center">
          <div className={sclass.sidebarLink}>Dashboard</div>
        </SidebarItem>
      </div>,
      <div className={sclass.sidebarItemContainer}>
        <SidebarItem href="/uploadfile" textAlign="center">
          <div className={sclass.sidebarLink}>Upload file</div>
        </SidebarItem>
      </div>,
      <div className={sclass.sidebarItemContainer}>
        <SidebarItem href="/files" textAlign="center">
          <div className={sclass.sidebarLink}>Files</div>
        </SidebarItem>
      </div>,
      <div className={sclass.sidebarItemContainer}>
        <SidebarItem href="/network" textAlign="center">
          <div className={sclass.sidebarLink}>Network</div>
        </SidebarItem>
      </div>,
      <div className={sclass.sidebarItemContainer}>
        <SidebarItem textAlign="center" href="/logout" activeHightlight="green">
          <div className={sclass.sidebarLink}>Logout</div>
        </SidebarItem>
      </div>
    ];
    return (
      <div className={sclass.sidebarContainer}>
        <Sidebar content={items} background="#1C2833" width={260}>
          <div
            style={{
              overflowX: "hidden",
              background: "#F2F4F4",
              height: "100vh"
            }}
          >
            <Switch>
              <Route path="/" exact>
                <Dashboard></Dashboard>
              </Route>
              <Route path="/profile">
                <Dashboard></Dashboard>
              </Route>
              <Route path="/files">
                <div style={{ textAlign: "center" }}>
                  <h1>Files</h1>
                  <Files></Files>
                </div>
              </Route>
              <Route path="/network">
                <Dashboard></Dashboard>
              </Route>
              <Route path="/uploadfile">
                <FileUpload></FileUpload>
              </Route>
            </Switch>
          </div>
        </Sidebar>
      </div>
    );
  }
}
export default Home;
