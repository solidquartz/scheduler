import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [errorMessage, setErrorMessage] = useState("");

  //resets the form
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }

  //cancel button functionality
  const cancel = () => {
    reset();
    props.onCancel();
  }


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => { setErrorMessage(""); setStudent(event.target.value); }}
            onSave={props.onSave}
            onCancel={props.onCancel}
          />
        </form>
        <InterviewerList
          value={interviewer}
          interviewers={props.interviewers}
          onChange={(id) => { setErrorMessage(""); setInterviewer(id); }}
        />
      </section>
      <section className="appointment__card-right">
        <p style={{ color: "red" }}>{errorMessage}</p>
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={() => {
            if (student === "" || !interviewer) {
              setErrorMessage("Please write a name and select an interviewer");
              return;
            }
            props.onSave(student, interviewer);
          }}>Save</Button>
        </section>
      </section>

    </main>
  );
}