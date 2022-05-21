import { useContext, createContext } from "react";
import io, { Socket } from "socket.io-client";

const socket = io("http://localhost:3001");
interface SocketContextValue {
  socket: Socket;
}

const SocketContext = createContext<SocketContextValue>({
  socket: null as any,
} as SocketContextValue);

export const useSocketContext = () => useContext(SocketContext);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
