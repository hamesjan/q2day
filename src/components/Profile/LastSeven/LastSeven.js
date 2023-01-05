import { useEffect, useState } from "react";
import DayQuestionAnswer from "./DayQuestionAnswer/DayQuestionAnswer";
import { db } from "../../../Firebase";
import "./LastSeven.css";
import { Link } from "react-router-dom";

const LastSeven = (props) => {
  const [date, setDate] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState("");

  let listItems;
  if (props.answers.length == 0) {
    listItems = (
      <h1 style={{ color: "grey", fontSize: "15px" }}>No questions answered</h1>
    );
  } else {
    listItems = props.dates.map((date, index) =>
      props.answers.map((answer, index) => {
        if (new Date(answer.timestamp).toDateString() === date.toDateString()) {
          return (
            <DayQuestionAnswer
              key={date.toDateString()}
              date={date}
              question={answer.question}
              selectedQuestion={selectedQuestion}
              setSelectedQuestion={setSelectedQuestion}
              answer={answer.answer}
              timestamp={answer.timestamp}
            />
          );
        }
      })
    );
  }

  return (
    <div className="last_seven-outer_wrapper">
      <div className="profile__table-wrapper">
        <div className="profile__table-left-column">
          <img
            src={
              props.profilePicURL == ""
                ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                : props.profilePicURL
            }
            alt="Hello"
            style={{
              height: "125px",
              width: "125px",
            }}
          ></img>
        </div>
        <div className="profile__table-right-column">
          <h1>{props.username}, 19</h1>
          <h2>
            {props.answers.length} question
            {props.answers.length == 1 ? "" : "s"} answered
          </h2>
          <h3>joined Dec 22, 2022</h3>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
        }}
      >
        <h1>Last 7 Days</h1>
        <div style={{ flexGrow: "1" }} />
        <Link to="/myresponses">
          <button>See all Answers</button>
        </Link>
      </div>
      {listItems}
    </div>
  );
};

export default LastSeven;

function getFormattedDate(timestamp) {
  // British English uses day-month-year order and 24-hour time without AM/PM
  return timestamp.toLocaleString("en-GB", { timeZone: "UTC" });
  // expected output: "20/12/2012, 03:00:00"
}
