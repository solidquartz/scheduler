import React from "react";
import classNames  from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {

  const formatSpots = (props) => {
    if (props.spots > 1) {
      return `${props.spots} spots remaining`
    }
    if (props.spots === 1) {
  return '1 spot remaining'
    }
    if (props.spots === 0) {
      return 'no spots remaining'
    }
  };

  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });


  return (
    <li className={dayClass} data-testid="day" onClick={() => props.setDay(props.name)}selected={props.selected}>
      <h2>{props.name}</h2>
      <h3>{formatSpots(props)}</h3>
    </li>
  );
}