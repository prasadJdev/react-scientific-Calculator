import React from "react";
import { ACTIONS } from "./App";
interface DigitButtonprops {
  dispatch: Function;
  digit: String;
}
export default function DigitButton({ dispatch, digit }: DigitButtonprops) {
  return (
    <button
      onClick={() => {
        dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
      }}
    >
      {digit}
    </button>
  );
}
