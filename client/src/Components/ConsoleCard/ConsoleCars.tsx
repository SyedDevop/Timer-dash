import { MenuIcon } from "../../Assets";
import { TimerBody } from "./TimerBody";

const ConsoleCars = () => {
  return (
    <div className="card-tab">
      <div className="card-tab__head">
        <div>
          <h4>Timer</h4>
          <h2>Console Number 1</h2>
        </div>
        <button>
          <MenuIcon />
        </button>
      </div>
      <TimerBody />
      <button className="delete-btn">Delete Tab</button>
    </div>
  );
};

export default ConsoleCars;
