import "./LandingPage.css";
import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import RefreshButton from "../Home/Answers/RefreshButton";
import { Link } from "react-router-dom";
import MiniAnswer from "./MiniAnswer/MiniAnswer";
import { BiUpArrowAlt } from "react-icons/bi";
import { addNewQuestion, recordGuestAnswer } from "../../Firebase";

const LandingPage = (props) => {
  const [isMobile, setIsMobile] = useState(false);
  const [answer, setAnswer] = useState("");

  const [progress, setProgress] = useState(0);

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

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = () => {
    setProgress(1);

    recordGuestAnswer(answer);
    // addNewQuestion(answer);
  };

  return (
    <div className="landing-page__outer-wrapper">
      <div
        style={{
          display: "block",
        }}
      >
        <div
          style={
            isMobile
              ? {
                  display: "block",
                }
              : {
                  display: "flex",
                  textAlign: "center",
                  alignItems: "center",
                }
          }
        >
          <h1
            style={{
              textWeight: "300",
              fontSize: "50px",
              color: "#FFFFFF",
              marginBottom: "10px",
              marginLeft: "30px",
            }}
          >
            q2day
          </h1>

          <div style={{ flexGrow: "1" }} />
          <div
            style={
              isMobile
                ? {
                    position: "absolute",
                    right: 0,
                    top: 50,
                    marginRight: "50px",
                    textAlign: "center",
                  }
                : { display: "block", marginRight: "50px", textAlign: "center" }
            }
          >
            {/* <Link to="/login">
              <h1
                style={{
                  textWeight: "200",
                  fontSize: "30px",
                  color: "#1982FC",
                  marginBottom: "0px",
                }}
              >
                Log in
              </h1>
            </Link>
            <Link to="/register">
              <h1
                style={{
                  marginTop: "3px",
                  textWeight: "200",
                  fontSize: "12px",
                  color: "grey",
                }}
              >
                new here?
              </h1>
            </Link> */}
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: "1" }} />

          <div
            style={{
              display: "block",
              paddingRight: "20px",
              textAlign: "center",
            }}
          >
            {progress == 1 ? (
              <h1 style={{ color: "#FFFFFF", fontSize: "15px" }}>
                {props.question}
              </h1>
            ) : (
              <div />
            )}
            <div
              className="landing-page__feed-wrapper"
              style={
                isMobile
                  ? progress == 0
                    ? { maxHeight: "30vh" }
                    : { maxHeight: "60vh" }
                  : { maxHeight: "50vh" }
              }
            >
              {answers.length == 0 ? <h1>Be the first to answer!</h1> : <div />}
              {refresh && <RefreshButton onClick={handleRefresh} />}
              {answers.map((answer) => (
                <MiniAnswer
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
      {progress == 0 ? (
        <div className="landing-page__textarea-wrapper">
          {progress == 0 ? (
            <h1 style={{ color: "#FFFFFF", fontSize: "15px" }}>
              {props.question}
            </h1>
          ) : (
            <div />
          )}
          <h3 style={{ fontWeight: "400", color: "whitesmoke" }}>
            your answer
          </h3>
          <textarea
            type="text"
            value={answer}
            className="landing-page__textarea"
            onChange={handleChange}
          />
          <div />
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
      ) : (
        <h1
          style={{
            color: "#FFFFFF",
            position: "absolute",
            bottom: "10px",
            fontSize: "12px",
            fontWeight: "200",
            marginLeft: "auto",
            marginRight: "auto",
            left: "0",
            right: "0",
            textAlign: "center",
          }}
        >
          Thank you for answering!
        </h1>
      )}
    </div>
  );
};

export default LandingPage;
