import React from "react";
import classes from "./Loading.css";
const Loading = props => {
  return (
    <>
      <div class="container">
        <div class="circle lg">
          <div class="circle md">
            <div class="circle sm">
              <div class="circle smlr"></div>
            </div>
          </div>
        </div>
        <span id="loading">{props.message?props.message:"Loading..."}</span>
      </div>
    </>
  );
};

export default Loading;
