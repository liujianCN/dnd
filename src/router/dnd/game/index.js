import React, { useState, useEffect } from "react";
import Board from "./Board";
import { observe } from "./Game";

export default () => {
  const [position, setPosition] = useState([0, 0]);
  useEffect(() => {
    observe(setPosition);
  }, []);
  return <Board knightPosition={position} />;
};
