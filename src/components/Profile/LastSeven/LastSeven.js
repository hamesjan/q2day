import { useState } from "react";
import DayQuestionAnswer from "./DayQuestionAnswer/DayQuestionAnswer";
import "./LastSeven.css";

const LastSeven = (props) => {
  const data = [
    { question: "q1", answer: "Hello", date: "Dec 12" },
    { question: "q1", answer: "Hello", date: "Dec 12" },
    { question: "q1", answer: "Hello", date: "Dec 12" },
    { question: "q1", answer: "Hello", date: "Dec 12" },
    { question: "q1", answer: "Hello", date: "Dec 12" },
    { question: "q1", answer: "Hello", date: "Dec 12" },
    { question: "q1", answer: "Hello", date: "Dec 12" },
  ];
  const listItems = data.map((d) => (
    <DayQuestionAnswer question={d.question} answer={d.answer} />
  ));

  return (
    <div className="last_seven-outer_wrapper">
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
        }}
      >
        <h1>Last 7 Days</h1>
        <div style={{ flexGrow: "1" }} />
        <button>See all Answers</button>
      </div>
      {listItems}
    </div>
  );
};

export default LastSeven;
