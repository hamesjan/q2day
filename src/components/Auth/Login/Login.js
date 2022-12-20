import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/google-icon.png";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../../../Firebase";

import { BiUpArrowAlt } from "react-icons/bi";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/home");
  }, [user, loading]);

  return (
    <div className="login">
      <div className="login__container">
        <h1 style={{ color: "#FFFFFF", fontWeight: "300", fontSize: "20px" }}>
          Login
        </h1>
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Link to="/reset" style={{ color: "#1982FC" }}>
          Forgot Password
        </Link>
        <div style={{ height: "10px" }} />
        <button
          className="login__btn"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          <BiUpArrowAlt style={{ height: "30px", width: "50px", color: "#" }} />
        </button>
        <div style={{ height: "20px" }} />
        <h2 style={{ color: "grey", fontWeight: "300" }}>or</h2>
        <div style={{ height: "20px" }} />
        <button className="login__google" onClick={signInWithGoogle}>
          <img
            src={logo}
            alt="Hello"
            style={{
              height: "20px",
              width: "20px",
              marginRight: "5px",
              position: "relative",
              top: "2px",
            }}
          ></img>
          Login with Google
        </button>
        <div style={{ height: "30px" }} />
        <div style={{ color: "#FFFFFF" }}>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Login;
