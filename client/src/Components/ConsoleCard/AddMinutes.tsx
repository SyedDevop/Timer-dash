import React, { useState, memo } from "react";
import { CSSTransition } from "react-transition-group";

import { AddMinutesProps } from "../../@Types";
import { useSocketContext } from "../../Hooks";

const AddMinutes = memo(({ state, setState, timerID }: AddMinutesProps) => {
  const [minutes, setMinutes] = useState<string | number>(NaN);
  const { socket } = useSocketContext();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("START_TIMER", { timerID, minutes });
    setState(false);
  };

  return (
    <>
      <CSSTransition
        in={state}
        classNames="add-min"
        timeout={100}
        unmountOnExit
        mountOnEnter
      >
        <div className="add-minutes tb-style">
          <form onSubmit={onSubmit}>
            <input
              type="number"
              placeholder="Min"
              value={minutes}
              onChange={(e) => {
                setMinutes(Number(e.target.value));
              }}
              autoFocus
            />
            <button type="submit" className="start-btn">
              start
            </button>
            <button
              type="button"
              onClick={() => {
                setState((pre) => !pre);
              }}
            >
              cancel
            </button>
          </form>
        </div>
      </CSSTransition>
    </>
  );
});

export { AddMinutes };
