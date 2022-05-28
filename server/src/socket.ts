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
  SET_TIMER_ACTION: "SET_TIMER_ACTION",
  GET_TIMER_STATE: "GET_TIMER_STATE",
  START_TIMER: "START_TIMER",
};

const socket = async ({ io }: { io: Server }) => {
  console.log("Socket enabled");
  const timer = new MyTimer();

  io.on("connection", (socket) => {
    io.emit(EVENTS.TIMER_START, timer.currentTimersTime);
    console.log("User connected ID:", socket.id);

    timer.getUpdateTimers("secondsUpdated", (id) => {
      socket.emit(`${id}seconds`, timer.currentTimersTime[id].seconds);
    });
    timer.getUpdateTimers("hoursUpdated", (id) => {
      socket.emit(`${id}hours`, timer.currentTimersTime[id].hours);
    });
    timer.getUpdateTimers("minutesUpdated", (id) => {
      socket.emit(`${id}minutes`, timer.currentTimersTime[id].minute);
    });

    socket.on(EVENTS.SET_TIMER_ACTION, ({ id, action }) => {
      let state = timer.setTimerActions(id, action);
      console.log({ state, action });

      io.emit(`${id}state`, state);
    });

    socket.on(EVENTS.START_TIMER, ({ timerID, minutes }) => {
      timer.timer[timerID].stop();
      timer.startTimer(timerID, minutes);
    });

    timer.test();
    socket.on(EVENTS.SET_NODE, ({ gpio, value }: SetNode) => {});
  });
};

export default socket;
