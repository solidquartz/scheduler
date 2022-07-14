import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const days = props.days.map((day) => {
    return (
      <DayListItem
        name={day.name}
        spots={day.spots}
      />
    );
  });

  return (
    <ul>
      <li>{days}</li>
    </ul>
  );
};