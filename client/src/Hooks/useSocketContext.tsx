import { useContext, createContext } from "react";
import io, { Socket } from "socket.io-client";
import { isDev } from "../Utils";

const devPath = isDev() ? "http://localhost:3001" : { path: "/socket.io" };
const socket = io(devPath);
interface SocketContextValue {
  socket: Socket;
  startingData?: any;
}

// const EVENTS = {
//   SET_NODE: "SET_NODE",
//   TIMER_START: "TIMER_START",
// };

const SocketContext = createContext<SocketContextValue>({
  socket: null as any,
} as SocketContextValue);

export const useSocketContext = () => useContext(SocketContext);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  // const [startingData, setStartingData] = useState<any>();
  // useEffect(() => {
  //   socket.on(EVENTS.TIMER_START, (node: any) => {
  //     setStartingData(node);
  //     console.log("startingData", startingData);
  //   });
  //   return () => {
  //     socket.off(EVENTS.TIMER_START);
  //   };
  // }, []);
  // console.log({ socket });

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
