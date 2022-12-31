import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DayQuestionAnswer.css";

const DayQuestionAnswer = (props) => {
  const navigate = useNavigate();

  if (props.answer == "") {
    return null;
  }

  const responseTimestamp = props.timestamp;

  return (
    <div>
      <div
        className="day-question-answer__outer-wrapper"
        onClick={() => {
          navigate(`/myresponses/${responseTimestamp}`);

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
      {props.selectedQuestion == props.question ? <p>Hello</p> : <p>No</p>}
    </div>
  );
};

export default DayQuestionAnswer;
