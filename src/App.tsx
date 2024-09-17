import "./App.scss";
import {
  CounterId,
  DecrementAction,
  DecrementAmountAction,
  IncrementAction,
  IncrementAmountAction,
  selectCounter,
  UseAppSelector,
} from "./store";
import { useDispatch } from "react-redux";
import { UsersList } from "./UsersList";

function App() {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Counter counterId="first" />
        <Counter counterId="second" />
        <Counter counterId="third" />

        <UsersList />
      </div>
    </>
  );
}

export function Counter({ counterId }: { counterId: CounterId }) {
  const dispatch = useDispatch();
  const counterState = UseAppSelector((state) =>
    selectCounter(state, counterId)
  );
  // const [, forceUpdate] = useReducer((x) => x + 1, 0);
  console.log("render counters", counterId);

  // const lastStateRef = useRef<ReturnType<typeof selectCounter>>();

  // useEffect(() => {
  //   const unsubscribe = store.subscribe(() => {
  //     const currentState = selectCounter(store.getState(), counterId);
  //     const lastState = lastStateRef.current;
  //     if (currentState !== lastState) {
  //       forceUpdate();
  //     }

  //     lastStateRef.current = currentState;
  //   });

  //   return unsubscribe;
  // }, []);

  // const counterState = selectCounter(store.getState(), counterId);
  return (
    <div>
      counter {counterState?.counter}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
        onClick={() =>
          dispatch({
            type: "increment",
            payload: { counterId },
          } satisfies IncrementAction)
        }
      >
        Increment 1
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
        onClick={() =>
          dispatch({
            type: "decrement",
            payload: { counterId },
          } satisfies DecrementAction)
        }
      >
        Decrement 1
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
        onClick={() =>
          dispatch({
            type: "incrementAmount",
            payload: { counterId },
          } satisfies IncrementAmountAction)
        }
      >
        Increment 3
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
        onClick={() =>
          dispatch({
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
