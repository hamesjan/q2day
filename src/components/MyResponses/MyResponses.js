import React from "react";
import { Link, Outlet } from "react-router-dom";

const MyResponses = ({ answers }) => {
  const handleClick = (timestamp) => {
    const responseTimestamp = timestamp;
    console.log(responseTimestamp);
  };

  return (
    <div>
      <div style={{ background: "#1E1E1E", textAlign: "center" }}>
        <div style={{ maxHeight: "80vh" }}>
          {answers.map((answer) => (
            <div key={answer.timestamp} style={{ color: "#ccc" }}>
              <div>Timestamp: {answer.timestamp}</div>
              <div>Question: {answer.question}</div>
              <div>Answer: {answer.answer}</div>
            </div>
          ))}
        </div>
      </div>

      {answers.map((answer) => {
        const responseTimestamp = answer.timestamp;
        return (
          <button onClick={handleClick(responseTimestamp)}>
            View Response
          </button>
        );
      })}
    </div>
  );
};

export default MyResponses;
