import React from "react";
import { ACTIONS } from "./App";

export default function DigitButton({ id, digit, dispatch }) {
  return (
    <button
      id={id}
      className="digitButton"
      onClick={() => dispatch({ type: ACTIONS.DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}
