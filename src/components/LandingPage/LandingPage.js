import "./LandingPage.css";
import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import RefreshButton from "../Home/Answers/RefreshButton";
import { Link, useNavigate } from "react-router-dom";
import MiniAnswer from "./MiniAnswer/MiniAnswer";
import { BiUpArrowAlt } from "react-icons/bi";
import { addNewQuestion, auth, recordGuestAnswer } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const LandingPage = (props) => {
  const [isMobile, setIsMobile] = useState(false);
  const [answer, setAnswer] = useState("");
  const [progress, setProgress] = useState(0);
  const [user, loading, error] = useAuthState(auth);
  const [answers, setAnswers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  // use useffect here if no data

  useEffect(() => {
    if (loading) return;
    if (user) return navigate("/home");
    if (error) return navigate("/error");
  }, [user, loading]);

  useEffect(() => {
    const isMobile = window.innerWidth <= 600;
    setIsMobile(isMobile);
  }, []);

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
      <div className="landing-page__visit-counter">
        <a href="http://stuff.mit.edu/doc/counter-howto.html">
          <img
            src="http://stuff.mit.edu/cgi/counter/q2daye7dcf"
            alt="several"
            style={{ marginRight: "5px" }}
          />
        </a>
        page visits
      </div>
      <div
        style={{
          display: "block",
        }}
      >
        <div className="landing-page__nav-bar">
          <h1
            style={{
              textWeight: "100",
              fontSize: "45px",
              color: "#FFFFFF",
            }}
          >
            q2day
          </h1>
          <div style={{ flexGrow: "1" }} />
          <Link to="/about">
            <button className="landing-page__about-button">about</button>
          </Link>
          <div style={{ width: "20px" }}></div>
          <Link to="/login">
            <button className="landing-page__login-button">login</button>
          </Link>
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
