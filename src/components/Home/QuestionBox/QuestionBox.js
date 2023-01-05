import React, { useState } from "react";
import { recordUserAnswer } from "../../../Firebase";
import { BiUpArrowAlt } from "react-icons/bi";

import "./QuestionBox.css";

function QuestionBox(props) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    props.setProgress(1);
    recordUserAnswer(
      props.uid,
      answer,
      props.username,
      props.question,
      props.lastAnswered,

      props.profilePicURL == ""
        ? "https://via.placeholder.com/200x200"
        : props.profilePicURL
    );
  };

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  return (
    <div
      style={{
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <div style={{ overflow: "hidden" }}>
        <div
          style={{
            display: "block",
            alignItems: "center",
            borderRadius: "15px",
          }}
        >
          <div style={{ display: "flex", minHeight: "80px" }}>
            <div style={{ flexGrow: "1" }} />
            <h1 className="question-box_h1">{props.question}</h1>
            <div style={{ flexGrow: "1" }} />
          </div>

          <textarea
            type="text"
            value={answer}
            className="question-box__textarea"
            onChange={handleChange}
          />
        </div>
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        style={{
          borderRadius: "25px",
          padding: 0,
          width: "50px",
          height: "50px",
          border: "none",
          background: "#1982FC",
          marginTop: "20px",
        }}
      >
        <BiUpArrowAlt
          style={{ height: "50px", width: "50px", color: "#FFFFFF" }}
        />
      </button>
    </div>
  );
}

export default QuestionBox;
