import { useEffect, useReducer } from "react";
import "./App.scss";
import {
  CounterId,
  DecrementAction,
  DecrementAmountAction,
  IncrementAction,
  IncrementAmountAction,
  store,
} from "./store";

function App() {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", columnGap: "10px" }}>
        <Counter counterId="first"/>
        <Counter counterId="second"/>
        <Counter counterId="third"/>
      </div>
    </>
  );
}

export function Counter({ counterId }: { counterId: CounterId }) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceUpdate();
    });

    return unsubscribe;
  }, []);

  return (
    <div>
      counter {store.getState().counters[counterId]?.counter}
      <button
        onClick={() =>
          store.dispatch({
            type: "increment",
            payload: { counterId },
          } satisfies IncrementAction)
        }
      >
        Increment 1
      </button>
      <button
        onClick={() =>
          store.dispatch({
            type: "decrement",
            payload: { counterId },
          } satisfies DecrementAction)
        }
      >
        Decrement 1
      </button>
      <button
        onClick={() =>
          store.dispatch({
            type: "incrementAmount",
            payload: { counterId },
          } satisfies IncrementAmountAction)
        }
      >
        Increment 3
      </button>
      <button
        onClick={() =>
          store.dispatch({
            type: "decrementAmount",
            payload: { counterId },
          } satisfies DecrementAmountAction)
        }
      >
        Decrement 3
      </button>
    </div>
  );
}

export default App;
