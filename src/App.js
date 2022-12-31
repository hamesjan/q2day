import "./App.css";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Profile from "./components/Profile/Profile";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Reset from "./components/Auth/Reset/Reset";

import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./Firebase";
import { collection, getDocs, query } from "firebase/firestore";
import withSplashScreen from "./components/withSplashScreen/withSplashScreen";
import withFirestoreData from "./components/withSplashScreen/withFirestoreData";
import MyResponses from "./components/MyResponses/MyResponses";
import SingleDay from "./components/MyResponses/SingleDay/SingleDay";

function App(props) {
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
              username={props.username}
            />
          }
        />
        <Route
          exact
          path="/myresponses"
          element={<MyResponses answers={props.answers} />}
        >
          <Route path=":responseTimestamp" element={<SingleDay />} />
        </Route>

        <Route exact path="/register" element={<Register />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/"
          element={
            <Home
              question={props.question}
              username={props.username}
              dates={props.dates}
              uid={props.uid}
            />
          }
        />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Layout>
  );
}

export default withSplashScreen(withFirestoreData(App));
