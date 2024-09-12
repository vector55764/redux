import { configureStore } from "@reduxjs/toolkit";

type State = {
  counter: number;
};

export type IncrementAction = {
  type: "increment";
};

export type IncrementAmountAction = {
  type: "incrementAmount";
};

export type DecrementAction = {
  type: "decrement";
};

export type DecrementAmountAction = {
  type: "decrementAmount";
};

type Action =
  | IncrementAction
  | DecrementAction
  | IncrementAmountAction
  | DecrementAmountAction;

const InitialState: State = {
  counter: 0,
};

const reducer = (state = InitialState, action: Action): State => {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        counter: state.counter++,
      };

    case "decrement":
      return {
        ...state,
        counter: state.counter--,
      };

    case "incrementAmount":
      return {
        ...state,
        counter: state.counter + 3,
      };

    case "decrementAmount":
      return {
        ...state,
        counter: state.counter - 3,
      };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: reducer,
});
