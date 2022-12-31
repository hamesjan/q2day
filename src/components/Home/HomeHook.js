import React, { useEffect, useState } from "react";
import Answers from "./Answers/Answers";
import QuestionBox from "./QuestionBox/QuestionBox";

const HomeHook = (props) => {
  const [progress, setProgress] = useState(0);

  const visibleComponent = () => {
    if (progress == 0) {
      return (
        <QuestionBox
          uid={props.uid}
          question={props.question}
          progress={progress}
          username={props.username}
          setProgress={setProgress}
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
