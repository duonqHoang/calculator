import React from "react";
import { ACTIONS } from "./App";

export default function OperatorButton({ id, operator, dispatch }) {
  return (
    <button
      id={id}
      className="operatorButton"
      onClick={() => {
        dispatch({ type: ACTIONS.OPERATOR, payload: { operator: operator } });
      }}
    >
      {operator}
    </button>
  );
}
