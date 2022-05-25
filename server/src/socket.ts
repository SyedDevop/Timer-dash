import { Server } from "socket.io";
import { timers } from "./Utils/Timer";

interface SetNode {
  gpio: number;
  value: "HIGH" | "LOW";
}

const EVENTS = {
  SET_NODE: "SET_NODE",
  TIMER_START: "TIMER_START",
};

const socket = async ({ io }: { io: Server }) => {
  console.log("Socket enabled");
  const timer = await timers();

  io.on("connection", (socket) => {
    console.log("User connected ID:", socket.id);

    socket.emit(EVENTS.TIMER_START, timer);

    socket.on(EVENTS.SET_NODE, ({ gpio, value }: SetNode) => {
      //   console.log(data);
    });
  });
};

export default socket;
