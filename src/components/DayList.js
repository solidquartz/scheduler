import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const { value, onChange } = props;

  const dayList = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={value === day.name}
        setDay={onChange}
      />
    );
  });

  return (
    <ul>
      {dayList}
    </ul>
  );
};