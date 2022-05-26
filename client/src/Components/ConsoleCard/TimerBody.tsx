import { useState, useEffect } from "react";
import { useTimer } from "react-timer-hook";

import { PlayIcon, PauseIcon } from "../../Assets";
import { AddMinutes } from "./AddMinutes";
import { toTwoDigit } from "../../Utils";
import { StartTimer, TimerBodyProps } from "../../@Types";
import { useSocketContext } from "../../Hooks";

export const TimerBody = ({ timeID }: TimerBodyProps) => {
  // const { minutes, seconds, hours, pause, restart, resume, isRunning } =
  //   useTimer({
  //     expiryTimestamp: new Date(),
  //   });

  const { socket } = useSocketContext();

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [hours, setHours] = useState(0);

  const [addMinuteState, setAddMinuteState] = useState(false);

  const handelClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      setAddMinuteState((pre) => !pre);
    }
  };

  // const handelPlayPass = () => {
  //   if (isRunning) {
  //     pause();
  //   } else {
  //     resume();
  //   }
  // };

  useEffect(() => {
    socket.on("TIMER_START", (node: StartTimer) => {
      setMinutes(node[timeID].minute);
      setSeconds(node[timeID].seconds);
      setHours(node[timeID].hours);
    });

    return () => {
      socket.off("TIMER_START");
    };
  }, []);

  return (
    <div className="card-tab__body tb-style" onClick={handelClick}>
      <div>
        <div>
          <span>{toTwoDigit(hours)}</span>
          <h3>hour</h3>
        </div>
        <span>:</span>
        <div>
          <span>{toTwoDigit(minutes)}</span>
          <h3>minutes</h3>
        </div>
        <span>:</span>
        <div>
          <span>{toTwoDigit(seconds)}</span>
          <h3>seconds</h3>
        </div>
      </div>

      <button>{true ? <PauseIcon /> : <PlayIcon />}</button>
      <AddMinutes
        state={addMinuteState}
        setState={setAddMinuteState}
        timeReset={() => {}}
      />
    </div>
  );
};
