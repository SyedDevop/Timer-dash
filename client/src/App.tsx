import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Components/Footer/Footer";

import Nav from "./Components/Nav/Nav";
import SocketProvider from "./Hooks/useSocketContext";
import Home from "./Pages/Home";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <SocketProvider>
        <QueryClientProvider client={queryClient}>
          <Nav />
          <Home />
          <ToastContainer theme="dark" position="top-center" />
          <Footer />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </SocketProvider>
    </div>
  );
}

export default App;
