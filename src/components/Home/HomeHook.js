import React, { useEffect, useState } from "react";
import withSplashScreen from "../withSplashScreen/withSplashSreen";
import Answers from "./Answers/Answers";
import QuestionBox from "./QuestionBox/QuestionBox";

const HomeHook = (props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (props.question == "") {
      window.location.reload();
    }
  }, []);

  const visibleComponent = () => {
    const todayDate = Date.now();
    const currentDate = new Date(todayDate);

    if (
      new Date(props.lastAnswered).toDateString() === currentDate.toDateString()
    ) {
      return <Answers question={props.question} />;
    }
    if (progress == 0) {
      return (
        <QuestionBox
          uid={props.uid}
          question={props.question}
          progress={progress}
          username={props.username}
          setProgress={setProgress}
          lastAnswered={props.lastAnswered}
          profilePicURL={props.profilePicURL}
        />
      );
    } else if (progress == 1) {
      return <Answers question={props.question} />;
    }
  };
  return {
    visibleComponent,
  };
};

export default HomeHook;
