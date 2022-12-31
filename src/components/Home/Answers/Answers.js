import "./Answers.css";
import React, { useState, useEffect } from "react";
import RefreshButton from "./RefreshButton";
import firebase from "firebase/compat/app";
import DailyAnswer from "./DailyAnswer/DailyAnswer";

const Answers = (props) => {
  const [answers, setAnswers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("q2day")
      .doc("daily")
      .onSnapshot((doc) => {
        setAnswers(doc.data().responses);
      });
    return () => unsubscribe();
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

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
          {refresh && <RefreshButton onClick={handleRefresh} />}
          {answers.map((answer) => (
            <DailyAnswer
              answer={answer.answer}
              question={answer.question}
              key={answer.uid}
              name={answer.name}
              profilePicURL={answer.profilePicURL}
              timestamp={answer.timestamp}
            />
          ))}
        </div>
      </div>
      <div style={{ flexGrow: 1 }} />
    </div>
  );
};

export default Answers;
