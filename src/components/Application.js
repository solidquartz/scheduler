import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import "components/Application.js";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


//////

export default function Application() {

  //state handlers//
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //booking//
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({...state, appointments})
    console.log(id, interview);
  };

  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const setDay = day => setState({ ...state, day });


  //axios//
  const daysUrl = "http://localhost:8001/api/days";
  const appointmentsUrl = "http://localhost:8001/api/appointments";
  const interviewerURL = "http://localhost:8001/api/interviewers";

  useEffect(() => {
    axios.get("/api/days")
    Promise.all([axios.get(daysUrl), axios.get(appointmentsUrl), axios.get(interviewerURL)])
      .then(response => {
        const days = response[0].data;
        const appointments = response[1].data;
        const interviewers = response[2].data;
        setState(prev => ({ ...prev, days, appointments, interviewers }))
      });
  }, []);


  //components//
  const appointment = dailyAppointments.map((appointment) => {

    const interview = getInterview(state, appointment.interview)
    const interviewers = getInterviewersForDay(state, state.day);
    console.log(interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />;
      </section>

      <section className="schedule">
        {appointment}
        <Appointment key="last" time="5pm" />

      </section>

    </main>
  );
}

