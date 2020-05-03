import React from "react";
import home from "./LandingPage.module.css";
import bg from "./Bg.module.css";
import { Link } from "react-router-dom";
const Home = props => {
  return (
    <>
      <div className={home.body}>
        <div className={bg.area}>
          <ul className={bg.circles}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className={home.halfcoloured}>Omega</div>
        <div className={home.bottom_div}>
          <div className={home.login}>
            <Link to="/login">
              <h1>Login</h1>
            </Link>
          </div>
          <div className={home.verticalLine}></div>
          <div className={home.signup}>
            <Link to="/signup">
              <h1>Signup</h1>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
