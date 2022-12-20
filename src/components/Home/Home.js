import "./Home.css";
import QuestionBox from "./QuestionBox/QuestionBox";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { auth, db, logout } from "../../Firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    fetchUserName();
  }, [user, loading]);
  return (
    <div className="haeome__outer-wrapper">
      {/* <div>{name}</div>
      <div>{user?.email}</div> */}
      <div className="home__question-box">
        <div style={{ flexGrow: 1 }} />
        <QuestionBox
          uid={user?.uid}
          hasAnswered={hasAnswered}
          setHasAnswered={setHasAnswered}
        />
        <div style={{ flexGrow: 1 }} />
      </div>
    </div>
  );
}
export default Home;
