import { useState } from "react";
import "./DayQuestionAnswer.css";

const DayQuestionAnswer = (props) => {
  return (
    <div className="day-question-answer__outer-wrapper">
      <div className="day-question-answer__date-holder">
        <h2>Dec</h2>
        <h2>19</h2>
      </div>
      <div className="day-question-answer__question-answer">
        <h2>{props.question}</h2>
        <h3>{props.answer}</h3>
      </div>
    </div>
  );
};

export default DayQuestionAnswer;
