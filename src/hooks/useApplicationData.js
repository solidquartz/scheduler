import React, { useState, useEffect } from "react";
import axios from "axios";


//state handlers//
export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });


  //SPOTS//
  //counts the number of spots remaining for a day
  const countSpots = (day, appointments) => {
    // let count = day.appointments.reduce((count, id) => { const appointment = appointments[id]; return !appointment.interview ? count + 1 : count; }, 0);

    let count = 0;

    for (const id of day.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        count += 1;
      }
    }
    return count;
  };



  const updateNumberOfSpots = (state, appointments) => {

    const selectedDayIndex = state.days.findIndex((day) => day.name === state.day);
    const selectedDay = state.days[selectedDayIndex];

    const spots = countSpots(selectedDay, appointments);

    const updatedDayObject = { ...selectedDay, spots };
    const updatedDays = [...state.days];
    updatedDays[selectedDayIndex] = updatedDayObject;

    return updatedDays;
  };


  //BOOKING & CANCELING//
  //book/create interview//
  const bookInterview = (id, interview) => {
    //updates object from bottom to top
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {
      interview
    })
      .then(() => {
        const days = updateNumberOfSpots(state, appointments);
        setState({ ...state, days, appointments });
      });
  };

  //cancel interview//
  const cancelInterview = (id, interviewer) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const days = updateNumberOfSpots(state, appointments);
        setState({ ...state, days, appointments });
      });
  };


  //fetch data from API//
  const daysUrl = "/api/days";
  const appointmentsUrl = "/api/appointments";
  const interviewerURL = "/api/interviewers";

  useEffect(() => {
    axios.get("/api/days");
    Promise.all([axios.get(daysUrl), axios.get(appointmentsUrl), axios.get(interviewerURL)])
      .then(response => {
        const days = response[0].data;
        const appointments = response[1].data;
        const interviewers = response[2].data;
        setState(prev => ({ ...prev, days, appointments, interviewers }));
      });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    countSpots,
    updateNumberOfSpots
  };
}