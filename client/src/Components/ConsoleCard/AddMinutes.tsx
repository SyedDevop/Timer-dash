import { useState } from "react";
import { CSSTransition } from "react-transition-group";

import { RestartIcon } from "../../Assets";
import { AddMinutesProps } from "../../@Types";
import { useSocketContext } from "../../Hooks";

export const AddMinutes = ({ state, setState, timeReset }: AddMinutesProps) => {
  const [minutes, setMinutes] = useState(0);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    timeReset(new Date(Date.now() + minutes * 60 * 1000), true);
    setState(false);
  };

  const handelRestart = () => {
    timeReset(new Date(Date.now() + minutes * 60 * 1000), true);
  };

  // const { socket } = useSocketContext();

  return (
    <>
      <button className="rest-btn" onClick={handelRestart}>
        <RestartIcon />
      </button>
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
};
