import { useReducer, useState } from "react";
import "./style.css";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationDigit";
import SingleEvalOperation from "./SingleEvalOperation";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
  SINGLE_EVALUATE: "single-evaluate",
};

function singleEvaluate(state: any, operation: any) {
  const current = parseFloat(state.currentOperand);

  if (isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "fact":
      computation = fact(current).toString();
      function fact(x: number) {
        var f = 1;
        for (let i = 2; i <= x; i++) {
          f = f * i;
        }
        return f;
      }
      break;
    case "square":
      computation = (current * current).toString();

      break;
    case "cube":
      computation = (current * current * current).toString();
      break;

    case "squareRoot":
      computation = Math.sqrt(current).toString();
      break;
    case "cubeRoot":
      computation = Math.cbrt(current).toString();
      break;
    case "e":
      computation = Math.exp(current).toString();
      break;
    case "log":
      computation = Math.log(current).toString();
      break;

    case "sin":
      computation = Math.sin(current).toString();
      break;
    case "cos":
      computation = Math.cos(current).toString();
      break;
    case "tan":
      computation = Math.tan(current).toString();
      break;
  }
  return computation;
}
interface DispatchProps {
  type: string;
  payload: {
    type?: string;
    operation?: string;
    digit?: string;
  };
}
function reducer(state: any, { type, payload }: DispatchProps) {
  switch (type) {
    case ACTIONS.SINGLE_EVALUATE:
      return {
        ...state,
        previousOperand: state.currentOperand,
        overide: true,
        currentOperand: singleEvaluate(state, payload.operation),
        operation: payload.operation,
      };

    case ACTIONS.ADD_DIGIT: //done
      if (state.overide)
        return {
          ...state,
          currentOperand: payload.digit,
          overide: false,
        };

      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand.includes("."))
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CLEAR: //done
      return {};
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      )
        return state;
      return {
        ...state,
        previousOperand: null,
        overide: true,
        currentOperand: evaluate(state),
        operation: null,
      };

    case ACTIONS.CHOOSE_OPERATION: //done
      if (state.currentOperand == null && state.previousOperand === null)
        return state;
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        currentOperand: null,
        operation: payload.operation,
      };
    case ACTIONS.DELETE_DIGIT: //done
      if (state.overide)
        return {
          ...state,
          currentOperand: null,
          overide: false,
        };
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1)
        return { ...state, currentOperand: null };
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
  }
}
interface EvalProps {
  currentOperand: string;
  previousOperand: string;
  operation: string;
}
function evaluate({ currentOperand, previousOperand, operation }: EvalProps) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  // console.log("HEllo" + prev + current + operation);
  if (isNaN(prev) && isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = (prev + current).toString();
      break;
    case "-":
      computation = (prev - current).toString();
      break;
    case "*":
      computation = (prev * current).toString();
      break;
    case "/":
      computation = (prev / current).toString();
      break;

    case "%":
      computation = ((prev / current) * 100).toFixed(3);
      break;
  }
  return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

function formatOperand(operand: any) {
  if (operand === null || operand === "") return;
  let operand1 = operand ? operand : "";
  const [integer, decimal] = operand1.split(".");

  if (decimal == null) return INTEGER_FORMATTER.format(integer);

  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function App() {
  const [isActive, setActive] = useState(false);

  function handleToogleOperations() {
    setActive(!isActive);
  }

  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="container">
      <div className="calculator-grid">
        <div className="output">
          <div className="previous-operand">
            {formatOperand(previousOperand)} {operation}
          </div>
          <div className="current-operand">{formatOperand(currentOperand)}</div>
        </div>
        <button
          className="span-two"
          onClick={() => {
            dispatch({
              type: ACTIONS.CLEAR,
              payload: {
                type: undefined,
                operation: undefined,
                digit: undefined,
              },
            });
          }}
        >
          AC
        </button>
        <button
          className="span-two"
          onClick={() => {
            dispatch({
              type: ACTIONS.DELETE_DIGIT,
              payload: {
                type: undefined,
                operation: undefined,
                digit: undefined,
              },
            });
          }}
        >
          DEL
        </button>

        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />

        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />

        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />

        <DigitButton digit="0" dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <button
          className=""
          onClick={() =>
            dispatch({
              type: ACTIONS.EVALUATE,
              payload: {
                type: undefined,
                operation: undefined,
                digit: undefined,
              },
            })
          }
        >
          =
        </button>
        <button className="span-end" onClick={handleToogleOperations}>
          &darr; {/* arrow*/}
        </button>

        <OperationButton
          isActive={isActive}
          operation="+"
          handleToogleOperations={handleToogleOperations}
          dispatch={dispatch}
        />
        <OperationButton
          isActive={isActive}
          operation="-"
          handleToogleOperations={handleToogleOperations}
          dispatch={dispatch}
        />
        <OperationButton
          isActive={isActive}
          operation="*"
          handleToogleOperations={handleToogleOperations}
          dispatch={dispatch}
        />
        <OperationButton
          isActive={isActive}
          operation="/"
          handleToogleOperations={handleToogleOperations}
          dispatch={dispatch}
        />
        <OperationButton
          isActive={isActive}
          operation="%"
          handleToogleOperations={handleToogleOperations}
          dispatch={dispatch}
        />

        <SingleEvalOperation
          isActive={isActive}
          operation="fact"
          value="x!"
          dispatch={dispatch}
          handleToogleOperations={handleToogleOperations}
        />

        <SingleEvalOperation
          isActive={isActive}
          operation="square"
          value="x&#178;"
          dispatch={dispatch}
          handleToogleOperations={handleToogleOperations}
        />

        <SingleEvalOperation
          isActive={isActive}
          value="x&#xB3;"
          operation="cube"
          dispatch={dispatch}
          handleToogleOperations={handleToogleOperations}
        />
        <SingleEvalOperation
          value="&#8730;"
          isActive={isActive}
          operation="squareRoot"
          dispatch={dispatch}
          handleToogleOperations={handleToogleOperations}
        />
        <SingleEvalOperation
          isActive={isActive}
          value="&#8731;"
          operation="cubeRoot"
          dispatch={dispatch}
          handleToogleOperations={handleToogleOperations}
        />
        <SingleEvalOperation
          isActive={isActive}
          value="e"
          operation="e"
          dispatch={dispatch}
          handleToogleOperations={handleToogleOperations}
        />
        <SingleEvalOperation
          isActive={isActive}
          value="log"
          operation="log"
          dispatch={dispatch}
          handleToogleOperations={handleToogleOperations}
        />

        <SingleEvalOperation
          isActive={isActive}
          value="sin"
          operation="sin"
          dispatch={dispatch}
          handleToogleOperations={handleToogleOperations}
        />
        <SingleEvalOperation
          isActive={isActive}
          value="cos"
          operation="cos"
          dispatch={dispatch}
          handleToogleOperations={handleToogleOperations}
        />
        <SingleEvalOperation
          isActive={isActive}
          value="tan"
          operation="tan"
          dispatch={dispatch}
          handleToogleOperations={handleToogleOperations}
        />
        <SingleEvalOperation
          isActive={isActive}
          value="&Pi;"
          operation="pi"
          dispatch={dispatch}
          handleToogleOperations={handleToogleOperations}
        />
      </div>
    </div>
  );
}

export default App;
