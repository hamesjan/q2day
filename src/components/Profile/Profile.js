import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";
import LastSeven from "./LastSeven/LastSeven";
import firebase from "firebase/compat/app";
import "../withSplashScreen/splash-screen.css";
import "./Profile.css";

const Profile = (props) => {
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!props.uid) {
      window.location.reload();
    }
    if (!user) return navigate("/login");
  }, [user, loading]);

  if (!props.uid) {
    return LoadingMessage();
  }
  return (
    <div className="profile__outer-wrapper">
      <LastSeven
        username={props.username}
        uid={props.uid}
        dates={props.dates}
        answers={props.answers}
        profilePicURL={props.profilePicURL}
      />
    </div>
  );
};

export default Profile;

function LoadingMessage() {
  return (
    <div className="splash-screen">
      <h1 style={{ textWeight: "300" }}>q2day</h1>
      <div className="loading-dot">.</div>
    </div>
  );
}
