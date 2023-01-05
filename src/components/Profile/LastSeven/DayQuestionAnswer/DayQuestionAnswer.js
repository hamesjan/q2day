import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DayQuestionAnswer.css";

const DayQuestionAnswer = (props) => {
  if (props.answer == "") {
    return null;
  }

  if (props.selectedQuestion == props.question) {
    return (
      <div
        className="day-question-answer__selected-outer-wrapper"
        onClick={() => {
          props.setSelectedQuestion(null);
        }}
      >
        <div className="day-question-answer__selected-question-answer">
          <h2 style={{ fontSize: "15px", fontWeight: "300", color: "grey" }}>
            {getFormattedDate(props.timestamp)}
          </h2>
          <br />
          <div style={{ flexGrow: 1 }} />
          <h2>{props.question}</h2>
          <br />
          <h3>{props.answer}</h3>
          <div style={{ flexGrow: 1 }} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        className="day-question-answer__outer-wrapper"
        onClick={() => {
          if (props.selectedQuestion == props.question) {
            props.setSelectedQuestion(null);
          } else {
            props.setSelectedQuestion(props.question);
          }
        }}
      >
        <div className="day-question-answer__date-holder">
          <h2>{props.date.toLocaleString("en-US", { month: "short" })}</h2>
          <h2>{props.date.getDate()}</h2>
        </div>
        <div className="day-question-answer__question-answer">
          <div style={{ flexGrow: 1 }} />
          <h2>{props.question}</h2>
          <h3>{props.answer}</h3>
          <div style={{ flexGrow: 1 }} />
        </div>
      </div>
    </div>
  );
};

export default DayQuestionAnswer;

function getFormattedDate(timestamp) {
  var date = new Date(timestamp);
  var year = date.getFullYear();
  var month = (1 + date.getMonth()).toString().padStart(2, "0");
  var day = date.getDate().toString().padStart(2, "0");
  var hours = date.getHours().toString().padStart(2, "0");
  var minutes = date.getMinutes().toString().padStart(2, "0");
  var seconds = date.getSeconds().toString().padStart(2, "0");

  return (
    month + "/" + day + "/" + year + " " + hours + ":" + minutes + ":" + seconds
  );
}
