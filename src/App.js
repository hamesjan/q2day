import "./App.css";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Profile from "./components/Profile/Profile";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Reset from "./components/Auth/Reset/Reset";
import { auth } from "./Firebase";

import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  Redirect,
} from "react-router-dom";

function App() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <Layout>
      <Routes>
        <Route path="/profile" element={<Profile username="hi" />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;
