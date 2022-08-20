import { Server, Socket } from "socket.io";
import { log } from "./logger";
import MyTimer, { setTimerActionsType } from "./Utils/Timer";

// interface SetNode {
//   gpio: number;
//   value: "HIGH" | "LOW";
// }

const EVENTS = {
  SET_NODE: "SET_NODE",
  TIMER_START: "TIMER_START",
  UPDATE_TIMER: "UPDATE_TIMER",
  SET_TIMER_ACTION: "SET_TIMER_ACTION",
  GET_TIMER_STATE: "GET_TIMER_STATE",
  START_TIMER: "START_TIMER",
  RESTART_TIMER: "RESTART_TIMER",
};

const sockets = ({ io }: { io: Server }) => {
  log.info("Socket enabled");
  let timer = new MyTimer();
  setTimeout(() => {
    timer.allTargetAchievedEventListener();
  }, 1000);
  io.on("connection", (socket) => {
    log.info(`User connected ID: ${socket.id}`);
    // Event to emit the current time to new connected user.
    for (const timeId in timer.currentTimersTime) {
      socket.on(EVENTS.TIMER_START + timeId, (callbackFn: any) => {
        callbackFn({
          hours: timer.currentTimersTime[timeId].hours,
          minute: timer.currentTimersTime[timeId].minute,
          seconds: timer.currentTimersTime[timeId].seconds,
          state: timer.currentTimersTime[timeId].state,
        });
      });
    }

    // Get all the current timers state and time.
    getUpdateTimers(timer, socket, io);

    // Event to handel pause, play and reset
    socket.on(
      EVENTS.SET_TIMER_ACTION,
      ({ id, action }: { id: string; action: setTimerActionsType }) => {
        const state = timer.setTimerActions(id, action);
        io.emit(`${id}state`, state);
        if (action === "reset") {
          emitCurrentTime(socket, id, timer);
        }
      }
    );
    // Event to start a new timer
    socket.on(
      EVENTS.START_TIMER,
      ({ timerID, minutes }: { timerID: string; minutes: number }) => {
        timer.timer[timerID].stop();
        const isRunning = timer.startTimer(timerID, minutes);
        io.emit(`${timerID}state`, isRunning);
        emitCurrentTime(socket, timerID, timer);
      }
    );
    // Restart the Timers with updated console
    socket.on(EVENTS.RESTART_TIMER, () => {
      // remove all listeners
      timer.removeAllListeners();
      // create new timer
      timer = new MyTimer({ presetTimers: timer.timer });
      setTimeout(() => {
        timer.allTargetAchievedEventListener();
      }, 1000);
    });

    // socket.on(EVENTS.SET_NODE, ({ gpio, value }: SetNode) => {});
  });
  // timer.test();
};

function emitCurrentTime(socket: Socket, timerId: string, timer: MyTimer) {
  socket.emit(`${timerId}minutes`, timer.currentTimersTime[timerId].minute);
  socket.emit(`${timerId}hours`, timer.currentTimersTime[timerId].hours);
}

function getUpdateTimers(timer: MyTimer, socket: Socket, io: Server) {
  timer.getUpdateTimers("secondsUpdated", (id) => {
    socket.emit(`${id}seconds`, timer.currentTimersTime[id].seconds);
  });
  timer.getUpdateTimers("hoursUpdated", (id) => {
    socket.emit(`${id}hours`, timer.currentTimersTime[id].hours);
  });
  timer.getUpdateTimers("minutesUpdated", (id) => {
    socket.emit(`${id}minutes`, timer.currentTimersTime[id].minute);
  });
  timer.getUpdateTimers("targetAchieved", (id, currentState) => {
    io.emit(`${id}state`, currentState);
  });
}

export default sockets;
