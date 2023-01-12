import "./LandingPage.css";
import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import RefreshButton from "../Home/Answers/RefreshButton";
import DailyAnswer from "../Home/Answers/DailyAnswer/DailyAnswer";
import { Link } from "react-router-dom";

const LandingPage = (props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth <= 600;
    setIsMobile(isMobile);
  }, []);

  const [answers, setAnswers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("q2day")
      .doc("daily")
      .onSnapshot((doc) => {
        setAnswers(doc.data().responses.reverse());
      });
    return () => unsubscribe();
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="landing-page__outer-wrapper">
      <div
        style={{
          display: "block",
        }}
      >
        <div style={{ display: "flex" }}>
          <h1
            style={{
              textWeight: "300",
              fontSize: "50px",
              color: "#FFFFFF",
              marginLeft: "30px",
            }}
          >
            q2day
          </h1>
          <div style={{ flexGrow: "1" }} />
          <Link to="/login">
            <h1
              style={{
                textWeight: "200",
                fontSize: "30px",
                color: "#1982FC",
                marginRight: "50px",
              }}
            >
              Log in
            </h1>
          </Link>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: "1" }} />
          <h2 style={{ width: "400px", color: "#FFFFFF", fontWeight: "200" }}>
            q2day was designed for fun. Answer the question and see what the
            world says!
          </h2>

          <div style={{ flexGrow: "1" }} />
          <div style={{ display: "block", paddingRight: "20px" }}>
            <h1 style={{ color: "#FFFFFF" }}>{props.question}</h1>
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
        </div>
      </div>
      <div style={{ flexGrow: 1 }} />
    </div>
  );
};

export default LandingPage;
