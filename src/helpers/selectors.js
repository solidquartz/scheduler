//returns an array of appointments for a given day
export function getAppointmentsForDay(state, day) {

  const filteredDay = state.days.find(days => days.name === day);

  if (!filteredDay) {
    return [];
  }

  const appointmentsArray = filteredDay.appointments;
  const appointmentsForDay = [];

  for (const appointment of appointmentsArray) {
    appointmentsForDay.push(state.appointments[appointment]);
  }
  return appointmentsForDay;
}
