import Nav from "./Components/Nav/Nav";
import ConsoleCard from "./Components/ConsoleCard";
import SocketProvider from "./Hooks/useSocketContext";

function App() {
  return (
    <div className="App">
      <SocketProvider>
        <Nav />
        <button>send</button>
        <div className="container grid">
          <ConsoleCard />
          <ConsoleCard />
          <ConsoleCard />
          <ConsoleCard />
        </div>
      </SocketProvider>
    </div>
  );
}

export default App;
