import React from "react";
import { ACTIONS } from "./App";

export function evaluate(expressionString) {
  //match negative exponentials, exponentials, negative decimals, negative ints, decimals, ints, multiply sign, division sign respectively(ignore plus sign)
  let splitted = expressionString
    .replace(/--/g, "+")
    .match(
      /-\d+\.\d+e[-+]\d+|-\d+e[-+]\d+|\d+\.\d+e[-+]\d+|\d+e[-+]\d+|-\d+\.\d+|--\d+|-\d+|\d+\.\d+|\d+|×|÷/g
    );
  let converted = splitted.map((item) => {
    return item === "×" || item === "÷" ? item : parseFloat(item);
  });

  //Process multiply and division sign
  for (let i = 0; i < converted.length; i++) {
    if (["×", "÷"].includes(converted[i + 1])) {
      if (converted[i + 1] === "×") {
        converted[i + 2] = converted[i] * converted[i + 2];
        converted[i] = 0;
        converted[i + 1] = 0;
      } else {
        converted[i + 2] = converted[i] / converted[i + 2];
        converted[i] = 0;
        converted[i + 1] = 0;
      }
      i++;
    }
  }
  //sum all
  let result = converted.reduce((sum, num) => {
    return sum + num;
  }, 0);
  return Math.round(result * 1000000000000) / 1000000000000;
}

export default function EqualsButton({ id, dispatch }) {
  return (
    <button
      id={id}
      className="two-block"
      onClick={() => {
        dispatch({ type: ACTIONS.EVALUATE });
      }}
    >
      =
    </button>
  );
}
