import { createAction, createReducer } from "@reduxjs/toolkit";
import { AppState } from "../../store";

type CounterState = {
  counter: number;
};

export type CounterId = string;

type CountersState = Record<CounterId, CounterState | undefined>;

export const IncrementAction = createAction<{ counterId: CounterId }>(
  "counters/increment"
);
export const DecrementAction = createAction<{ counterId: CounterId }>(
  "counters/decrement"
);
export const IncrementAmountAction = createAction<{ counterId: CounterId }>(
  "counters/incrementAmount"
);
export const DecrementAmountAction = createAction<{ counterId: CounterId }>(
  "counters/decrementAmount"
);

const InitialCounterState: CounterState = { counter: 0 };
const InitialCountersState: CountersState = {};

export const countersReducer = createReducer(
  InitialCountersState,
  (builder) => {
    builder.addCase(IncrementAction, (state, action) => {
      const { counterId } = action.payload;
      const currentCounter = state[counterId] ?? InitialCounterState;
      return {
        ...state,
        [counterId]: {
          ...currentCounter,
          counter: currentCounter.counter + 1,
        },
      };
    });
    builder.addCase(DecrementAction, (state, action) => {
      const { counterId } = action.payload;
      if (!state[counterId]) {
        state[counterId] = InitialCounterState;
      }
      state[counterId].counter--;
    });
    builder.addCase(IncrementAmountAction, (state, action) => {
      const { counterId } = action.payload;
      if (!state[counterId]) {
        state[counterId] = InitialCounterState;
      }
      state[counterId].counter += 3;
    });
    builder.addCase(DecrementAmountAction, (state, action) => {
      const { counterId } = action.payload;
      if (!state[counterId]) {
        state[counterId] = InitialCounterState;
      }
      state[counterId].counter -= 3;
    });
  }
);

export const selectCounter = (state: AppState, counterId: CounterId) =>
  state.counters[counterId];
