import React, { useState } from "react";
import { recordUserAnswer } from "../../../Firebase";
import { BiUpArrowAlt } from "react-icons/bi";

function QuestionBox(props) {
  const [validated, setValidated] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleSubmit = (event) => {
    console.log(answer);
    recordUserAnswer(props.uid, answer);
    event.preventDefault();
  };

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <div style={{ overflow: "hidden" }}>
        <div
          style={{
            display: "block",
            textAlign: "center",
            borderRadius: "15px",
          }}
        >
          <h1
            style={{
              fontSize: "30px",
              overflowWrap: "break-word",
              maxWidth: "70vh",
              fontWeight: "300",
              color: "#FFFFFF",
            }}
          >
            What is your favorite color and why?
          </h1>
          <textarea
            type="text"
            value={answer}
            style={{
              borderRadius: "15px",
              fontSize: "30px",
              padding: "16px",
              minHeight: "250px",
              maxHeight: "250px",
              maxWidth: "600px",
              minWidth: "600px",
            }}
            onChange={handleChange}
          />
        </div>
      </div>
      <button
        type="submit"
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
    </form>
  );
}

export default QuestionBox;
