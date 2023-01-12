import "./Home.css";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import HomeHook from "./HomeHook";
import { auth } from "../../Firebase";
import withSplashScreen from "../withSplashScreen/withSplashSreen";

const Home = (props) => {
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  // use useffect here if no data

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    if (error) return navigate("/error");
  }, [user, loading]);

  const { visibleComponent } = HomeHook({
    question: props.question,
    uid: props.uid,
    username: props.username,
    lastAnswered: props.lastAnswered,
    profilePicURL: props.profilePicURL,
  });

  if (loading) {
    return <div>{user.uid}</div>;
  }

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
