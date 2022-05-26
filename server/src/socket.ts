import { Socket } from "dgram";
import { Server } from "socket.io";
import MyTimer from "./Utils/Timer";

interface SetNode {
  gpio: number;
  value: "HIGH" | "LOW";
}

const EVENTS = {
  SET_NODE: "SET_NODE",
  TIMER_START: "TIMER_START",
  UPDATE_TIMER: "UPDATE_TIMER",
};

const startingTimers = (timer: MyTimer["timer"]) => {
  interface Timers {
    [key: string]: {
      minute: number;
      seconds: number;
      hours: number;
    };
  }
  const timers: Timers = {} as Timers;
  for (const time in timer) {
    timers[time] = {
      minute: timer[time].getTimeValues().minutes,

      seconds: timer[time].getTimeValues().seconds,

      hours: timer[time].getTimeValues().hours,
    };
  }
  return timers;
};

const updateTimer = (socket: Socket) => {
  
};

const socket = async ({ io }: { io: Server }) => {
  console.log("Socket enabled");
  const timer = new MyTimer();

  io.on("connection", (socket) => {
    console.log("User connected ID:", socket.id);

    socket.emit(EVENTS.TIMER_START, startingTimers(timer.timer));
    socket.emit(EVENTS.UPDATE_TIMER);

    socket.on(EVENTS.SET_NODE, ({ gpio, value }: SetNode) => {
      //   console.log(data);
    });
  });
};

export default socket;
