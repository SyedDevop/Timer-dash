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
        <Button
          onClick={playPause}
          rest={{ "aria-label": "play pause button" }}
        >
          {isRunning ? <PauseIcon /> : <PlayIcon />}
        </Button>
        <Button
          className="rest-btn"
          onClick={reset}
          rest={{ "aria-label": "restart button" }}
        >
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
  rest?: any;
}

export const Button: FC<Button> = memo(
  ({ className, onClick, children, rest }) => {
    return (
      <button className={className} onClick={onClick} {...rest}>
        {children}
      </button>
    );
  }
);
