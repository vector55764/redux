import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store";
import {
  CounterId,
  DecrementAction,
  DecrementAmountAction,
  IncrementAction,
  IncrementAmountAction,
  selectCounter,
} from "./counters.slice";
import { bindActionCreators } from "@reduxjs/toolkit";

export function Counter({ counterId }: { counterId: CounterId }) {
  const dispatch = useDispatch();
  const counterState = useAppSelector((state) =>
    {
      console.log(state)
      return selectCounter(state, counterId)
    }
  );

  const actions = bindActionCreators(
    {
      DecrementAction,
      DecrementAmountAction,
      IncrementAction,
      IncrementAmountAction,
    },
    dispatch
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
        onClick={() => actions.IncrementAction({ counterId })}
      >
        Increment 1
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
        onClick={() => actions.DecrementAction({ counterId })}
      >
        Decrement 1
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
        onClick={() => actions.IncrementAmountAction({ counterId })}
      >
        Increment 3
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
        onClick={() => actions.DecrementAmountAction({ counterId })}
      >
        Decrement 3
      </button>
    </div>
  );
}
