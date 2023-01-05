import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";
import DayQuestionAnswer from "../Profile/LastSeven/DayQuestionAnswer/DayQuestionAnswer";

import "./MyResponses.css";

const MyResponses = ({ answers }) => {
  const [user, loading, error] = useAuthState(auth);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate("/login");
  }, [user, loading]);

  return (
    <div className="my-responses__outer-wrapper">
      <div style={{ flexGrow: "1" }} />
      <div style={{ maxHeight: "80vh" }}>
        <div className="my-responses-list-wrapper">
          <h1>Your Answers</h1>
          {answers.map((answer, index) => {
            return (
              <DayQuestionAnswer
                key={answer.timestamp}
                date={new Date(answer.timestamp)}
                question={answer.question}
                selectedQuestion={selectedQuestion}
                setSelectedQuestion={setSelectedQuestion}
                answer={answer.answer}
                timestamp={answer.timestamp}
              />
            );
          })}
          {answers.length == 0 ? (
            <h1 style={{ color: "grey", fontSize: "15px" }}>
              No questions answered
            </h1>
          ) : null}
        </div>
      </div>
      <div style={{ flexGrow: "1" }} />
    </div>
  );
};

export default MyResponses;
