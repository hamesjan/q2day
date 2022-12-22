import "./App.css";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Profile from "./components/Profile/Profile";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Reset from "./components/Auth/Reset/Reset";

import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState("");

  return (
    <Layout>
      <Routes>
        <Route
          path="/profile"
          element={<Profile username={name == "" ? "bug" : name} />}
        />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/"
          element={
            <Home
              progress={progress}
              setProgress={setProgress}
              setName={setName}
            />
          }
        />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;
