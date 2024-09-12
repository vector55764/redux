import { configureStore } from "@reduxjs/toolkit";

type CounterState = {
  counter: number;
};

export type CounterId = string;

type State = {
  counters: Record<CounterId, CounterState | undefined>;
};

export type IncrementAction = {
  type: "increment";
  payload: {
    counterId: CounterId;
  };
};

export type IncrementAmountAction = {
  type: "incrementAmount";
  payload: {
    counterId: CounterId;
  };
};

export type DecrementAction = {
  type: "decrement";
  payload: {
    counterId: CounterId;
  };
};

export type DecrementAmountAction = {
  type: "decrementAmount";
  payload: {
    counterId: CounterId;
  };
};

type Action =
  | IncrementAction
  | DecrementAction
  | IncrementAmountAction
  | DecrementAmountAction;

const InitialCounterState: CounterState = { counter: 0 };
const InitialState: State = {
  counters: {},
};

const reducer = (state = InitialState, action: Action): State => {
  switch (action.type) {
    case "increment": {
      const { counterId } = action.payload;
      const currentCounter = state.counters[counterId] ?? InitialCounterState;
      return {
        ...state,
        counters: {
          ...state.counters,
          [counterId]: {
            ...currentCounter,
            counter: currentCounter.counter + 1,
          },
        },
      };
    }

    case "decrement": {
      const { counterId } = action.payload;
      const currentCounter = state.counters[counterId] ?? InitialCounterState;
      return {
        ...state,
        counters: {
          ...state.counters,
          [counterId]: {
            ...currentCounter,
            counter: currentCounter.counter - 1,
          },
        },
      };
    }

    case "incrementAmount": {
      const { counterId } = action.payload;
      const currentCounter = state.counters[counterId] ?? InitialCounterState;
      return {
        ...state,
        counters: {
          ...state.counters,
          [counterId]: {
            ...currentCounter,
            counter: currentCounter.counter + 3,
          },
        },
      };
    }

    case "decrementAmount": {
      const { counterId } = action.payload;
      const currentCounter = state.counters[counterId] ?? InitialCounterState;
      return {
        ...state,
        counters: {
          ...state.counters,
          [counterId]: {
            ...currentCounter,
            counter: currentCounter.counter - 3,
          },
        },
      };
    }

    default:
      return state;
  }
};

export const store = configureStore({
  reducer: reducer,
});
