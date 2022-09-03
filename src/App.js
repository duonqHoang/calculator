import "./App.css";
import { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperatorButton from "./OperatorButton";
import EqualsButton, { evaluate } from "./EqualsButton";

export const ACTIONS = {
  DIGIT: "DIGIT",
  OPERATOR: "OPERATOR",
  DECIMAL: "DECIMAL",
  EVALUATE: "EVALUATE",
  CLEAR: "CLEAR",
  DELETE: "DELETE",
};

const INITIALSTATE = {
  expression: "",
  currentOperand: "0",
  overwrite: true,
  initial: true,
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.CLEAR:
      return INITIALSTATE;

    case ACTIONS.DELETE:
      if (state.initial) return state;
      if (state.expression.includes("=")) return INITIALSTATE;
      if (state.expression.length == 1) return INITIALSTATE;
      if (/[-+×÷]\d$/.test(state.expression)) {
        return {
          ...state,
          expression: state.expression.slice(0, state.expression.length - 1),
          currentOperand: state.expression[state.expression.length - 2],
          overwrite: true,
        };
      }
      if (/[-+×÷]+$/.test(state.expression)) {
        let nums = state.expression.match(/\d+/g);
        console.log(nums);
        return {
          ...state,
          expression: state.expression.replace(/[-+×÷]+$/, ""),
          currentOperand: nums[nums.length - 1],
          overwrite: false,
        };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(
          0,
          state.currentOperand.length - 1
        ),
        expression: state.expression.slice(0, state.expression.length - 1),
      };

    case ACTIONS.DIGIT:
      if (state.expression.includes("="))
        return {
          ...state,
          currentOperand: payload.digit,
          expression: payload.digit,
          overwrite: false,
        };
      if (state.initial)
        return {
          ...state,
          currentOperand: payload.digit,
          expression: payload.digit,
          overwrite: false,
          initial: false,
        };
      if (state.currentOperand == "0" && payload.digit == "0") return state;
      if (state.overwrite)
        return {
          ...state,
          currentOperand: payload.digit,
          expression: state.expression + payload.digit,
          overwrite: false,
        };
      return {
        ...state,
        currentOperand: state.currentOperand + payload.digit,
        expression: state.expression + payload.digit,
      };

    case ACTIONS.DECIMAL:
      if (state.expression.includes("="))
        return {
          ...state,
          currentOperand: 0 + ".",
          expression: 0 + ".",
          overwrite: false,
        };
      if (state.initial)
        return {
          ...state,
          currentOperand: "0.",
          expression: "0.",
          overwrite: false,
          initial: false,
        };
      if (state.currentOperand.includes(".")) return state;
      return {
        ...state,
        currentOperand: state.currentOperand + ".",
        expression: state.expression + ".",
      };

    case ACTIONS.OPERATOR:
      if (state.initial)
        return {
          ...state,
          currentOperand: payload.operator,
          expression: "0" + payload.operator,
          initial: false,
        };
      if (state.expression.includes("="))
        return {
          ...state,
          currentOperand: payload.operator,
          expression: state.currentOperand + payload.operator,
          overwrite: true,
        };
      if (!state.overwrite)
        return {
          ...state,
          currentOperand: payload.operator,
          expression: state.expression + payload.operator,
          overwrite: true,
        };
      if (/\d[-+×÷]$/.test(state.expression) && payload.operator == "-")
        return {
          ...state,
          currentOperand: "-",
          expression: state.expression + payload.operator,
        };
      if (/[-+×÷]+$/.test(state.expression) && payload.operator != "-") {
        return {
          ...state,
          currentOperand: payload.operator,
          expression: state.expression.replace(/[-+×÷]+$/, payload.operator),
        };
      }

    case ACTIONS.EVALUATE:
      if (state.initial)
        return {
          ...state,
          expression: "0=0",
          currentOperand: "0",
          initial: false,
          overwrite: true,
        };
      if (state.expression.includes("=") || state.overwrite) return state;
      let result = evaluate(state.expression);
      return {
        ...state,
        currentOperand: result,
        expression: state.expression + "=" + result,
        overwrite: true,
      };
    default:
      return state;
  }
}

function App() {
  const [{ currentOperand, expression, overwrite, initial }, dispatch] =
    useReducer(reducer, INITIALSTATE);

  return (
    <>
      <div className="calculator">
        <div className="display">
          <div className="expression">{expression}</div>
          <div id="display" className="current-operand">
            {currentOperand}
          </div>
        </div>
        <button
          id="clear"
          className="two-block"
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        >
          AC
        </button>
        <button
          id="delete"
          onClick={() => {
            dispatch({ type: ACTIONS.DELETE });
          }}
        >
          DEL
        </button>
        <OperatorButton id="divide" operator="÷" dispatch={dispatch} />
        <DigitButton id="seven" digit="7" dispatch={dispatch} />
        <DigitButton id="eight" digit="8" dispatch={dispatch} />
        <DigitButton id="nine" digit="9" dispatch={dispatch} />
        <OperatorButton id="multiply" operator="×" dispatch={dispatch} />
        <DigitButton id="four" digit="4" dispatch={dispatch} />
        <DigitButton id="five" digit="5" dispatch={dispatch} />
        <DigitButton id="six" digit="6" dispatch={dispatch} />
        <OperatorButton id="subtract" operator="-" dispatch={dispatch} />
        <DigitButton id="one" digit="1" dispatch={dispatch} />
        <DigitButton id="two" digit="2" dispatch={dispatch} />
        <DigitButton id="three" digit="3" dispatch={dispatch} />
        <OperatorButton id="add" operator="+" dispatch={dispatch} />
        <DigitButton id="zero" digit="0" dispatch={dispatch} />
        <button
          id="decimal"
          onClick={() => {
            dispatch({ type: ACTIONS.DECIMAL });
          }}
        >
          .
        </button>
        <EqualsButton id="equals" dispatch={dispatch} />
      </div>
      <p className="credit">Made by Hoppor</p>
    </>
  );
}

export default App;
