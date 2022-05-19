import Nav from "./Components/Nav/Nav";
import ConsoleCard from "./Components/ConsoleCard";

function App() {
  return (
    <div className="App">
      <Nav />
      <div className="container grid">
        <ConsoleCard />
        <ConsoleCard />
        <ConsoleCard />
        <ConsoleCard />
      </div>
    </div>
  );
}

export default App;
