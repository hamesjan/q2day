import "./Home.css";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import HomeHook from "./HomeHook";
import { auth } from "../../Firebase";

const Home = (props) => {
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  // use useffect here if no data

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  }, [user, loading]);

  const { visibleComponent } = HomeHook({
    question: props.question,
    uid: props.uid,
    username: props.username,
    lastAnswered: props.lastAnswered,
    profilePicURL: props.profilePicURL,
  });
  return (
    <div className="home__outer-wrapper">
      <div className="home__question-box">
        <div style={{ flexGrow: 1 }} />
        {visibleComponent()}
        <div style={{ flexGrow: 1 }} />
      </div>
    </div>
  );
};
export default Home;
