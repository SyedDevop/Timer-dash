import Nav from "./Components/Nav/Nav";
import SocketProvider from "./Hooks/useSocketContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Home from "./Pages/Home";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <SocketProvider>
        <QueryClientProvider client={queryClient}>
          <Nav />
          <Home />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </SocketProvider>
    </div>
  );
}

export default App;
