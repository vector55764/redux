import {
  combineReducers,
  configureStore,
  createSelector,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";

export type UserId = string;

export type User = {
  id: UserId;
  name: string;
  description: string;
};

const users: User[] = Array.from({ length: 3000 }, (_, index) => ({
  id: `user${index + 11}`,
  name: `User${index + 11}`,
  description: `Description for User ${index + 11}`,
}));

type UsersState = {
  entities: Record<UserId, User>;
  ids: UserId[];
  selectedUserId: UserId | undefined;
};

type CounterState = {
  counter: number;
};

type CountersState = Record<CounterId, CounterState | undefined>;

export type CounterId = string;

type State = {
  counters: CountersState;
  users: UsersState;
};

export type UserSelectedAction = {
  type: "userSelected";
  payload: {
    userId: UserId;
  };
};

export type UserRemoveSelectedAction = {
  type: "userRemoveSelected";
};

export type UsersStoredAction = {
  type: "usersStored";
  payload: {
    users: User[];
  };
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
  | DecrementAmountAction
  | UserSelectedAction
  | UserRemoveSelectedAction
  | UsersStoredAction;

const InitialCounterState: CounterState = { counter: 0 };
const InitialUsersState: UsersState = {
  entities: {},
  ids: [],
  selectedUserId: undefined,
};
const InitialCountersState: CountersState = {};
const InitialState: State = {
  counters: {},
  users: InitialUsersState,
};

const usersReducer = (
  state = InitialUsersState,
  action: Action
): UsersState => {
  switch (action.type) {
    case "usersStored": {
      const { users } = action.payload;
      return {
        ...state,
        entities: users.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {} as Record<UserId, User>),
        ids: users.map((user) => user.id),
      };
    }

    case "userSelected": {
      const { userId } = action.payload;
      return {
        ...state,
        selectedUserId: userId,
      };
    }

    case "userRemoveSelected": {
      return {
        ...state,
        selectedUserId: undefined,
      };
    }

    default:
      return state;
  }
};

const countersReducer = (
  state = InitialCountersState,
  action: Action
): CountersState => {
  switch (action.type) {
    case "increment": {
      const { counterId } = action.payload;
      const currentCounter = state[counterId] ?? InitialCounterState;
      return {
        ...state,
        [counterId]: {
          ...currentCounter,
          counter: currentCounter.counter + 1,
        },
      };
    }

    case "decrement": {
      const { counterId } = action.payload;
      const currentCounter = state[counterId] ?? InitialCounterState;
      return {
        ...state,
        [counterId]: {
          ...currentCounter,
          counter: currentCounter.counter - 1,
        },
      };
    }

    case "incrementAmount": {
      const { counterId } = action.payload;
      const currentCounter = state[counterId] ?? InitialCounterState;
      return {
        ...state,
        [counterId]: {
          ...currentCounter,
          counter: currentCounter.counter + 3,
        },
      };
    }

    case "decrementAmount": {
      const { counterId } = action.payload;
      const currentCounter = state[counterId] ?? InitialCounterState;
      return {
        ...state,
        [counterId]: {
          ...currentCounter,
          counter: currentCounter.counter - 3,
        },
      };
    }

    default:
      return state;
  }
};

const reducer = combineReducers({
  users: usersReducer,
  counters: countersReducer,
});

export const store = configureStore({
  reducer: reducer,
});

store.dispatch({
  type: "usersStored",
  payload: { users },
} satisfies UsersStoredAction);

export const selectCounter = (state: AppState, counterId: CounterId) =>
  state.counters[counterId];

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const UseAppSelector = useSelector.withTypes<AppState>();
export const useAppDispath = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<AppState>();
