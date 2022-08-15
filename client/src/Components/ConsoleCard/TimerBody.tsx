import { useCallback } from "react";

import { TimerBodyProps } from "../../@Types";
import { useTimerBody } from "./useTimerBody";

import { TimerButton, TimeBlock, AddMinutes } from ".";

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

  const submit = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      handelClick(e);
    },
    []
  );

  const reset = useCallback(() => {
    timeReset();
  }, []);

  const playPause = useCallback(() => {
    handelPlayPass();
  }, [isRunning]);

  return (
    <div className="card-tab__body tb-style" onClick={submit}>
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
