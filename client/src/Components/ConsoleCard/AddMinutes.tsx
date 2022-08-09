import React, { useState, memo } from "react";
import { CSSTransition } from "react-transition-group";

import { AddMinutesProps } from "../../@Types";
import { useSocketContext } from "../../Hooks";
import Button from "../Ui/Button/Button";

const AddMinutes = memo(({ state, setState, timerID }: AddMinutesProps) => {
  const [minutes, setMinutes] = useState<string>("");
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
        timeout={700}
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
                setMinutes(e.target.value);
              }}
              autoFocus
              className="primary__input"
            />
            <Button type="submit">start</Button>
            <Button
              textColor="red"
              onClick={() => {
                setState((pre) => !pre);
              }}
            >
              cancel
            </Button>
          </form>
        </div>
      </CSSTransition>
    </>
  );
});

export { AddMinutes };
