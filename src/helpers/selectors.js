//returns an array of appointments for a given day
export function getAppointmentsForDay(state, day) {

  const filteredDay = state.days.find(days => days.name === day);

  if (!filteredDay) return [];

return filteredDay.appointments.map(appointmentId => state.appointments[appointmentId]);

}

//////////
// grabs the interview

export function getInterview(state, interview) {

  if (!interview) return null;

  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };

}

//////////
// returns interviewers for a given day
export function getInterviewersForDay(state, day) {

  const filteredDay = state.days.find(days => days.name === day);

  if (!filteredDay) return [];

return filteredDay.interviewers.map(InterviewersId => state.interviewers[InterviewersId]);

}