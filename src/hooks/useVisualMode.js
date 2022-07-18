import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {

    //skips a mode
    if (replace === true) {
      history.pop();
      setMode(mode);
    }
    //move forward one mode
      setMode(newMode);
      setHistory((previousHistory) => [...previousHistory, newMode]);
  };
  
  const back = () => {

    //stops mode moving past initial
    if (history.length <= 1) {
      return;
    }
    
    setHistory((previousHistory) => previousHistory.slice(0, history.length - 1));
  };

  return { mode: history[history.length - 1], transition, back };

};