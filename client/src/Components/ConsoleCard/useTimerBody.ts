import { useEffect, useState } from "react";
import { useSocketContext } from "../../Hooks";

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
    socket.on(`${timeID}hours`, (hours: number) => {
      setHours(hours);
    });
    socket.on(`${timeID}minutes`, (minutes: number) => {
      setMinutes(minutes);
    });
    socket.on(`${timeID}seconds`, (second: number) => {
      setSeconds(second);
    });
    socket.on(`${timeID}state`, (state: boolean) => {
      setIsRunning(state);
    });
    return () => {
      socket.off(`${timeID}seconds`);
      socket.off(`${timeID}minutes`);
      socket.off(`${timeID}hours`);
      socket.off(`${timeID}state`);
    };
  }, []);

  useEffect(() => {
    socket.emit(`TIMER_START${timeID}`, (data: any) => {
      console.log({ data });
      setIsRunning(data.state);
      setMinutes(data.minute);
      setSeconds(data.seconds);
      setHours(data.hours);
    });
    return () => {
      socket.off(`TIMER_START${timeID}`);
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
