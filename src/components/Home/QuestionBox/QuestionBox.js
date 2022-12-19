import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { recordUserAnswer } from "../../../Firebase";

function QuestionBox(props) {
  const [validated, setValidated] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      console.log(answer);
      setValidated(true);
      recordUserAnswer(props.uid, answer);
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group
        as={Col}
        controlId="validationCustom01"
        style={{ textAlign: "center" }}
      >
        <Form.Label
          style={{
            fontSize: "30px",
            overflowWrap: "break-word",
            maxWidth: "70vh",
          }}
        >
          What is your favorite color?
        </Form.Label>
        <Form.Control
          required
          minLength={5}
          as="textarea"
          onChange={(e) => setAnswer(e.target.value)}
          rows={4}
          style={{
            minHeight: "80px",
            fontSize: "30px",
            minWidth: "70vh",
            maxWidth: "70vh",
          }}
          type="textArea"
          placeholder="....."
        />
        <Form.Control.Feedback>Nice Answer!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">Too short.</Form.Control.Feedback>
      </Form.Group>
      <div style={{ display: "flex", marginTop: "30px" }}>
        <div style={{ flexGrow: "1" }} />
        <Button type="submit">Submit</Button>
        <div style={{ flexGrow: "1" }} />
      </div>
    </Form>
  );
}

export default QuestionBox;
