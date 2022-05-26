import { MenuIcon } from "../../Assets";
import { TimerBody } from "./TimerBody";
import { ConsolesApi } from "../../@Types";

const ConsoleCars = ({ name, id }: ConsolesApi) => {
  return (
    <div className="card-tab">
      <div className="card-tab__head">
        <div>
          <h4>Timer</h4>
          <h2>{name}</h2>
        </div>
        <button>
          <MenuIcon />
        </button>
      </div>
      <TimerBody timeID={id} />
      <button className="delete-btn">Delete Tab</button>
    </div>
  );
};

export default ConsoleCars;
