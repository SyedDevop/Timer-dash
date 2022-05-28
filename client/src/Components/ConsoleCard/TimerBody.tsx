import { useCallback } from "react";
import { useHotkeys, isHotkeyPressed } from "react-hotkeys-hook";

import { AddMinutes } from "./AddMinutes";
import { TimerBodyProps } from "../../@Types";
import { TimeBlock } from "./TimeBlock";
import { useTimerBody } from "./useTimerBody";
import { TimerButton } from "./TimerButton";

export const TimerBody = ({ timeID, index }: TimerBodyProps) => {
  const {
    addMinuteState,
    handelClick,
    handelPlayPass,
    isRunning,
    timeReset,
    setAddMinuteState,
    hours,
    minutes,
    seconds,
  } = useTimerBody({ timeID });

  const reset = useCallback(() => {
    timeReset();
  }, []);

  const playPause = useCallback(() => {
    handelPlayPass();
  }, [isRunning]);

  return (
    <div className="card-tab__body tb-style" onClick={handelClick}>
      <div>
        <TimeBlock name="hours" time={hours} />
        <span>:</span>
        <TimeBlock name="minutes" time={minutes} />
        <span>:</span>
        <TimeBlock name="seconds" time={seconds} />
      </div>
      <TimerButton {...{ isRunning }} playPause={playPause} reset={reset} />
      <AddMinutes
        state={addMinuteState}
        setState={setAddMinuteState}
        timerID={timeID}
      />
    </div>
  );
};
