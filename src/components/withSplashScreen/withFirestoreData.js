import React, { useState, useEffect } from "react";
import { auth, db } from "../../Firebase";
import "./splash-screen.css";

function LoadingMessage() {
  return (
    <div className="splash-screen">
      <h1 style={{ textWeight: "300" }}>q2day</h1>
      <div className="loading-dot">.</div>
    </div>
  );
}

const withFirestoreData = (WrappedComponent) => {
  const WithFirestoreData = (props) => {
    const [question, setQuestion] = useState(null);
    const [dates, setDates] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [username, setUsername] = useState("");
    const [uid, setUid] = useState("");
    const [lastAnswered, setLastAnswered] = useState(null);
    const [profilePicURL, setProfilePicURL] = useState("");
    const [dateJoined, setDateJoined] = useState("");
    const [loading, setLoading] = useState(true);

    async function getfirestoreData() {
      if (!question) {
        console.log("reading");
        const uid = auth.currentUser;
        const dailyRef = db.collection("q2day").doc("daily");
        dailyRef.get().then((doc) => {
          setQuestion(doc.data().question);
        });

        const currentDate = new Date();
        let dates = [currentDate];
        for (let i = 0; i < 4; i++) {
          const date = new Date();
          date.setDate(currentDate.getDate() - (i + 1));
          dates.push(date);
        }
        setDates(dates);
        if (uid != null) {
          setUid(uid.uid);
          const userRef = db.collection("users").doc(uid.uid);
          userRef.get().then((doc) => {
            const docData = doc.data();
            setAnswers(docData.responses);
            setProfilePicURL(docData.profilePicURL);
            setLastAnswered(docData.lastAnswered);
            setUsername(docData.name);
            setDateJoined(docData.dateJoined);
          });
        }
      }
    }

    useEffect(() => {
      try {
        setTimeout(async () => {
          await getfirestoreData();
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }, []);

    if (loading) {
      return LoadingMessage();
    }

    return (
      <WrappedComponent
        {...props}
        question={question}
        dates={dates}
        answers={answers}
        username={username}
        uid={uid}
        profilePicURL={profilePicURL}
        lastAnswered={lastAnswered}
        dateJoined={dateJoined}
        setLastAnswered={setLastAnswered}
      />
    );
  };

  return WithFirestoreData;
};

export default withFirestoreData;
