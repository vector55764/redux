import { useEffect, useReducer } from "react";
import "./App.scss";
import {
  DecrementAction,
  DecrementAmountAction,
  IncrementAction,
  IncrementAmountAction,
  store,
} from "./store";

function App() {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceUpdate();
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <div style={{ display: "flex", columnGap: "10px" }}>
        counter {store.getState().counter}
        <button
          onClick={() =>
            store.dispatch({ type: "increment" } satisfies IncrementAction)
          }
        >
          Increment 1
        </button>
        <button
          onClick={() =>
            store.dispatch({ type: "decrement" } satisfies DecrementAction)
          }
        >
          Decrement 1
        </button>
        <button
          onClick={() =>
            store.dispatch({
              type: "incrementAmount",
            } satisfies IncrementAmountAction)
          }
        >
          Increment 3
        </button>
        <button
          onClick={() =>
            store.dispatch({
              type: "decrementAmount",
            } satisfies DecrementAmountAction)
          }
        >
          Decrement 3
        </button>
      </div>
    </>
  );
}

export default App;
