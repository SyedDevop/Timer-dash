import { useState } from "react";
import { useTimer } from "react-timer-hook";

import { PlayIcon, PauseIcon } from "../../Assets";
import { AddMinutes } from "./AddMinutes";
import { toTwoDigit } from "../../Utils";
import { TimerBodyProps } from "../../@Types";

export const TimerBody = ({}: TimerBodyProps) => {
  const { minutes, seconds, hours, pause, restart, resume, isRunning } =
    useTimer({
      expiryTimestamp: new Date(),
    });

  const [addMinuteState, setAddMinuteState] = useState(false);

  const handelClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      setAddMinuteState((pre) => !pre);
    }
  };

  const handelPlayPass = () => {
    if (isRunning) {
      pause();
    } else {
      resume();
    }
  };

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

      <button onClick={handelPlayPass}>
        {isRunning ? <PauseIcon /> : <PlayIcon />}
      </button>
      <AddMinutes
        state={addMinuteState}
        setState={setAddMinuteState}
        timeReset={restart}
      />
    </div>
  );
};
