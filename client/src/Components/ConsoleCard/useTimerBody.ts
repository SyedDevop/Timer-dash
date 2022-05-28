// // const [minutes, setMinutes] = useState(0);
// // const [seconds, setSeconds] = useState(0);
// // const [hours, setHours] = useState(0);

import { useEffect, useState } from "react";
import { StartTimer } from "../../@Types";
import { useSocketContext } from "../../Hooks";
import { toTwoDigit } from "../../Utils";

// const refIsNotNull = async () => {
//   const res = await Promise.all([
//     hoursRef.current,
//     minutesRef.current,
//     secondsRef.current,
//   ]);
//   return res;
// };

// useEffect(() => {
//   refIsNotNull();
//   socket.on("TIMER_START", (node: StartTimer) => {
//     if (hoursRef.current) {
//       hoursRef.current.textContent = `${toTwoDigit(node[timeID].hours)}`;
//     }
//     if (minutesRef.current) {
//       minutesRef.current.textContent = `${toTwoDigit(node[timeID].minute)}`;
//     }
//     if (secondsRef.current) {
//       secondsRef.current.textContent = `${toTwoDigit(node[timeID].seconds)}`;
//     }
//     setIsRunning(node[timeID].state);
//     console.log(node[timeID].hours);
//   });

//   return () => {
//     socket.off("TIMER_START");
//     refIsNotNull();
//   };
// }, [hoursRef, minutesRef, secondsRef]);

// useEffect(() => {
//   socket.on(`${timeID}seconds`, (second: number) => {
//     if (secondsRef.current) {
//       secondsRef.current.textContent = `${toTwoDigit(second)}`;
//     }
//   });
//   socket.on(`${timeID}minutes`, (minutes: number) => {
//     if (minutesRef.current) {
//       minutesRef.current.textContent = `${toTwoDigit(minutes)}`;
//     }
//   });
//   socket.on(`${timeID}hours`, (hours: number) => {
//     if (hoursRef.current) {
//       hoursRef.current.textContent = `${toTwoDigit(hours)}`;
//     }
//   });
//   socket.on(`${timeID}state`, (state: boolean) => {
//     setIsRunning(state);
//     console.log(state);
//   });
//   return () => {
//     socket.off(`${timeID}seconds`);
//     socket.off(`${timeID}minutes`);
//     socket.off(`${timeID}hours`);
//     socket.off(`${timeID}state`);
//   };
// }, []);

const useTimerBody = ({ timeID }: { timeID: string | number }) => {
  const { socket } = useSocketContext();
  const [isRunning, setIsRunning] = useState(false);
  const [addMinuteState, setAddMinuteState] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [hours, setHours] = useState(0);

  const handelClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      setAddMinuteState((pre) => !pre);
    }
  };

  const handelPlayPass = () => {
    console.log({ isRunning });
    if (isRunning) {
      socket.emit("SET_TIMER_ACTION", { id: timeID, action: "pause" });
    } else {
      socket.emit("SET_TIMER_ACTION", { id: timeID, action: "start" });
    }
  };

  const timeReset = () => {
    socket.emit("SET_TIMER_ACTION", { id: timeID, action: "reset" });
  };

  useEffect(() => {
    socket.on("TIMER_START", (node: StartTimer) => {
      setHours(node[timeID].hours);
      setMinutes(node[timeID].minute);
      setSeconds(node[timeID].seconds);
      setIsRunning(node[timeID].state);
      console.log(node);
    });

    return () => {
      socket.off("TIMER_START");
    };
  }, []);
  useEffect(() => {
    socket.on(`${timeID}hours`, (hours: number) => {
      setHours(hours);
    });
    socket.on(`${timeID}minutes`, (minutes: number) => {
      setMinutes(minutes);
    });
    socket.on(`${timeID}seconds`, (second: number) => {
      setSeconds(second);
    });
    return () => {
      socket.off(`${timeID}seconds`);
      socket.off(`${timeID}minutes`);
      socket.off(`${timeID}hours`);
      socket.off(`${timeID}state`);
    };
  }, []);

  useEffect(() => {
    socket.on(`${timeID}state`, (state: boolean) => {
      setIsRunning(state);
      console.log({ state });
    });
    return () => {
      socket.off(`${timeID}state`);
    };
  }, [isRunning, setIsRunning]);

  return {
    isRunning,
    handelPlayPass,
    timeReset,
    handelClick,
    addMinuteState,
    setAddMinuteState,
    minutes,
    seconds,
    hours,
  };
};

export { useTimerBody };
