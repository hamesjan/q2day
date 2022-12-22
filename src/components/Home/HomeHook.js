import React, { useEffect, useState } from "react";
import Answers from "./Answers/Answers";
import QuestionBox from "./QuestionBox/QuestionBox";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const HomeHook = (props) => {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const fetchQuestions = async () => {
    try {
      const q = query(collection(db, "q2day"));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setQuestion(data.question);
    } catch (err) {
      console.error(err);
      alert("question fetch error");
    }
  };

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", props.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      props.setName(data.name);
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("username fetch error");
    }
  };

  useEffect(() => {
    if (props.uid) {
      fetchUserName();
      fetchQuestions();
    }
  });

  const visibleComponent = () => {
    if (props.progress == 0) {
      return (
        <QuestionBox
          uid={props.uid}
          question={question}
          progress={props.progress}
          setProgress={props.setProgress}
        />
      );
    } else if (props.progress == 1) {
      return <Answers question={props.question} />;
    }
  };
  return {
    visibleComponent,
  };
};

export default HomeHook;
