import Nav from "./Components/Nav/Nav";
import ConsoleCard from "./Components/ConsoleCard";
import SocketProvider from "./Hooks/useSocketContext";
import Home from "./Pages/Home";

function App() {
  return (
    <div className="App">
      <SocketProvider>
        <Nav />
        <Home />
      </SocketProvider>
    </div>
  );
}

export default App;
