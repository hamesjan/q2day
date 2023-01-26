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
    // setAnswer("");
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

      <div className="landing-page__nav-bar">
        <h1
          style={{
            textWeight: "100",
            fontSize: isMobile ? "30px" : "45px",
            color: "#FFFFFF",
          }}
        >
          q2day
        </h1>
        <div style={{ flexGrow: "1" }} />
        <Link to="/about">
          <button
            className="landing-page__about-button"
            style={{
              fontSize: isMobile ? "20px" : "35px",
            }}
          >
            about
          </button>
        </Link>
        <div style={{ width: "20px" }}></div>
        {/* <Link to="/login"> */}
        <button
          className="landing-page__login-button"
          onClick={() => {
            alert("WORK IN PROGRESS LOLOLOLOL\nCOME BACK AGAIN :D");
          }}
          style={{
            opacity: "20",
            fontSize: isMobile ? "20px" : "35px",
          }}
        >
          login
        </button>
        {/* </Link> */}
      </div>
      {progress == 0 ? (
        <div className="landing-page__textarea-wrapper">
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: isMobile ? "25px" : "35px",
              fontWeight: "300",
            }}
          >
            {props.question}
          </h1>
          <div style={{ display: "flex", alignItems: "center" }}>
            <textarea
              type="text"
              value={answer}
              className="landing-page__textarea"
              onChange={handleChange}
              style={{ fontSize: isMobile ? "20px" : "35px" }}
            />
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
                marginLeft: isMobile ? "5px" : "20px",
              }}
            >
              <BiUpArrowAlt
                style={{ height: "50px", width: "50px", color: "#FFFFFF" }}
              />
            </button>
          </div>

          <div />
        </div>
      ) : (
        <div>
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: isMobile ? "25px" : "35px",
              fontWeight: "300",
              maxWidth: "80%",
              margin: "auto",
              marginBottom: "20px",
            }}
          >
            {props.question}
          </h1>
          <div
            className="landing-page__feed-wrapper"
            style={{ maxHeight: isMobile ? "45vh" : "55vh" }}
          >
            {answers.length == 0 ? (
              <h1 style={{ color: "#FFFFFF", fontWeight: "100" }}>
                Be the first to answer!
              </h1>
            ) : (
              <div />
            )}
            {refresh && <RefreshButton onClick={handleRefresh} />}
            {answers.map((answer) => (
              <MiniAnswer
                isMobile={isMobile}
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
      )}
    </div>
  );
};

export default LandingPage;
