import React from "react";

import { MenuIcon } from "../../Assets";
import { ConsolesApi } from "../../@Types";
import { ConsoleDeleteButton, TimerBody } from ".";

interface ConsoleCarsProps extends ConsolesApi {
  index: number;
}
const ConsoleCars = ({ name, id, index }: ConsoleCarsProps) => {
  return (
    <div className="card-tab">
      <div className="card-tab__head">
        <div>
          <h4>Timer</h4>
          <h2>{name}</h2>
        </div>
        <button aria-label="console car setting" className="console-btn">
          <MenuIcon />
        </button>
      </div>
      <TimerBody timeID={id} index={index} />
      <ConsoleDeleteButton consoleID={id} consoleName={name} />
    </div>
  );
};

export default ConsoleCars;
