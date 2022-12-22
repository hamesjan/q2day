import "./Home.css";
import QuestionBox from "./QuestionBox/QuestionBox";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { auth } from "../../Firebase";
import HomeHook from "./HomeHook";

const Home = (props) => {
  const [user, loading, error] = useAuthState(auth);
  const [hasAnswered, setHasAnswered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  }, [user, loading]);

  const { visibleComponent } = HomeHook({
    uid: user?.uid,
    hasAnswered: hasAnswered,
    setHasAnswered: setHasAnswered,
    progress: props.progress,
    setProgress: props.setProgress,
    setName: props.setName,
  });

  return (
    <div className="home__outer-wrapper">
      {/* <div>{name}</div>
      <div>{user?.email}</div> */}
      <div className="home__question-box">
        <div style={{ flexGrow: 1 }} />
        {visibleComponent()}
        <div style={{ flexGrow: 1 }} />
      </div>
    </div>
  );
};
export default Home;
