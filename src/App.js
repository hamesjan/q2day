import "./App.css";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Profile from "./components/Profile/Profile";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Reset from "./components/Auth/Reset/Reset";

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import withFirestoreData from "./components/withSplashScreen/withFirestoreData";
import MyResponses from "./components/MyResponses/MyResponses";
import AddMissingInfo from "./components/Auth/AddMissingInfo/AddMissingInfo";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import LandingPage from "./components/LandingPage/LandingPage";

function App(props) {
  // hi33
  return (
    <Layout>
      <Routes>
        <Route
          path="/profile"
          element={
            <Profile
              dates={props.dates}
              answers={props.answers}
              uid={props.uid}
              profilePicURL={props.profilePicURL}
              username={props.username}
              dateJoined={props.dateJoined}
            />
          }
        />
        <Route
          exact
          path="/myresponses"
          element={<MyResponses answers={props.answers} />}
        ></Route>

        <Route exact path="/register" element={<Register />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/error" element={<ErrorPage />} />
        <Route exact path="/addInfo" element={<AddMissingInfo />} />
        
        <Route
          exact
          path="/"
          element={<LandingPage question={props.question} />}
        />
        <Route
          exact
          path="home"
          element={
            <Home
              question={props.question}
              username={props.username}
              dates={props.dates}
              uid={props.uid}
              lastAnswered={props.lastAnswered}
              profilePicURL={props.profilePicURL}
            />
          }
        />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Layout>
  );
}

export default withFirestoreData(App);
