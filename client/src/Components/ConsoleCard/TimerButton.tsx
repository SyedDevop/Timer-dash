import { FC, memo } from "react";
import { RestartIcon } from "../../Assets";
import { PlayIcon, PauseIcon } from "../../Assets";

export const TimerButton = memo(
  ({
    playPause,
    isRunning,
    reset,
  }: {
    playPause: () => void;
    isRunning: boolean;
    reset: () => void;
  }) => {
    return (
      <>
        <Button onClick={playPause}>
          {isRunning ? <PauseIcon /> : <PlayIcon />}
        </Button>
        <Button className="rest-btn" onClick={reset}>
          <RestartIcon />
        </Button>
      </>
    );
  }
);

export interface Button {
  className?: string | "";
  onClick?: () => void;
  children?: React.ReactNode;
}

export const Button: FC<Button> = memo(({ className, onClick, children }) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
});
