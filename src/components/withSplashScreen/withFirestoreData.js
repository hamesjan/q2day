import React, { useState, useEffect } from "react";
import { auth, db } from "../../Firebase";

const withFirestoreData = (WrappedComponent) => {
  const WithFirestoreData = (props) => {
    const [question, setQuestion] = useState(null);
    const [dates, setDates] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [username, setUsername] = useState("");
    const [uid, setUid] = useState("");

    useEffect(() => {
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
      setUid(uid.uid);
      if (uid != null) {
        const userRef = db.collection("users").doc(uid.uid);
        userRef.get().then((doc) => {
          const docData = doc.data();
          console.log(docData);
          setAnswers(docData.responses);
          setUsername(docData.name);
        });
      }
    }, []);

    return (
      <WrappedComponent
        {...props}
        question={question}
        dates={dates}
        answers={answers}
        username={username}
        uid={uid}
      />
    );
  };

  return WithFirestoreData;
};

export default withFirestoreData;
