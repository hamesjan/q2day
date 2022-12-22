import React from "react";

import "./Answers.css";
import DailyAnswer from "./DailyAnswer/DailyAnswer";

const Answers = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        textAlign: "center",
        top: "0px",
        left: "45vh",
      }}
    >
      <div
        style={{
          display: "block",
        }}
      >
        <div style={{ height: "20px" }} />
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: "1" }} />
          <div style={{ display: "block", textAlign: "center" }}>
            <h1 style={{ color: "#FFFFFF" }}>{props.question}</h1>
            <p style={{ color: "grey" }}>aefaefaefaef</p>
          </div>
          <div style={{ flexGrow: "1" }} />
        </div>

        <div className="feed-wrapper">
          <DailyAnswer />
          <DailyAnswer />
          <DailyAnswer />
          <DailyAnswer />
          <DailyAnswer />
          <DailyAnswer />
          <DailyAnswer />
        </div>
      </div>
      <div style={{ flexGrow: 1 }} />
    </div>
  );
};

export default Answers;
