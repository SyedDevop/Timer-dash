import { memo, RefObject } from "react";
import { toTwoDigit } from "../../Utils";

export const TimeBlock = memo(
  ({
    name,
    timeRef,
    time,
  }: {
    name: string;
    timeRef?: RefObject<HTMLSpanElement>;
    time: number;
  }) => {
    return (
      <div>
        <span ref={timeRef}>{toTwoDigit(time)}</span>
        <h3>{name}</h3>
      </div>
    );
  }
);
