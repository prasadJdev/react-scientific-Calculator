import React from "react";
import { ACTIONS } from "./App";

interface SingleEvalOperationProps {
  dispatch: Function;
  operation: String;
  value: String;
  isActive: boolean;
  handleToogleOperations: Function;
}

export default function SingleEvalOperation({
  dispatch,
  operation,
  value,
  isActive,
  handleToogleOperations,
}: SingleEvalOperationProps) {
  return (
    <button
      className={`${isActive ? "active" : "shw_on_click"} `}
      onClick={() => {
        dispatch({ type: ACTIONS.SINGLE_EVALUATE, payload: { operation } });
        handleToogleOperations();
      }}
    >
      {value}
    </button>
  );
}
