import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BiUpArrowAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../../Firebase";

import logo from "../../../assets/images/google-icon.png";

import "./Register.css";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) history("/home");
  }, [user, loading]);

  return (
    <div className="login">
      <div className="login__container">
        <h1 className="login__text">Register</h1>
        <input
          type="text"
          className="login__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
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

        <div style={{ height: "10px" }} />

        <div style={{ display: "flex", marginTop: "0px" }}>
          <div style={{ flexGrow: 1 }} />
          <div style={{ display: "block", textAlign: "center" }}>
            <button
              onClick={register}
              style={{
                borderRadius: "25px",
                padding: 0,
                width: "50px",
                height: "50px",
                border: "none",
                background: "#1982FC",
              }}
            >
              <BiUpArrowAlt
                style={{ height: "50px", width: "50px", color: "#FFFFFF" }}
              />
            </button>
            <div style={{ height: "10px" }} />
            <h2 style={{ color: "grey", fontWeight: "300" }}>or</h2>
            <div style={{ height: "15px" }} />

            <button className="login__google" onClick={signInWithGoogle}>
              <img
                src={logo}
                alt="Hello"
                style={{
                  height: "25px",
                  width: "25px",
                  marginRight: "10px",
                  position: "relative",
                  top: "2px",
                }}
              ></img>
              Login with Google
            </button>
            <div style={{ height: "20px" }} />
            <div style={{ color: "#FFFFFF" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#1982FC" }}>
                Login
              </Link>{" "}
              now.
            </div>
          </div>
          <div style={{ flexGrow: 1 }} />
        </div>
      </div>
    </div>
  );
}
export default Register;
