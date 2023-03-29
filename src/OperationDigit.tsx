import React from "react";
import { ACTIONS } from "./App";

interface OperationButtonProps {
  dispatch: Function;
  operation: String;
  isActive: Boolean;
  handleToogleOperations: Function;
}

export default function OperationButton({
  dispatch,
  operation,
  isActive,
  handleToogleOperations,
}: OperationButtonProps) {
  return (
    <button
      className={`${isActive ? "active" : "shw_on_click"} `}
      onClick={() => {
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } });
        handleToogleOperations();
      }}
    >
      {operation}
    </button>
  );
}
