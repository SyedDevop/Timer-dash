import { useContext, createContext, useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";

const socket = io("http://localhost:3001");
interface SocketContextValue {
  socket: Socket;
}

const EVENTS = {
  SET_NODE: "SET_NODE",
  TIMER_START: "TIMER_START",
};

const SocketContext = createContext<SocketContextValue>({
  socket: null as any,
} as SocketContextValue);

export const useSocketContext = () => useContext(SocketContext);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  // const [sockets, setSockets] = useState<Socket | null>(null);
  useEffect(() => {
    socket.on(EVENTS.TIMER_START, (node: any) => {
      console.log("node", node);
    });
  });

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
