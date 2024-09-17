import "./App.scss";
import { UsersList } from "./modules/users/UsersList";
import { Counter } from "./modules/counters/counters";

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

export default App;
