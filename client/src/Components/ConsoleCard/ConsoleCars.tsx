import { MenuIcon } from "../../Assets";
import { TimerBody } from "./TimerBody";
import { ConsolesApi } from "../../@Types";

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
        <button aria-label="console car setting">
          <MenuIcon />
        </button>
      </div>
      <TimerBody timeID={id} index={index} />
      <button className="delete-btn">Delete Tab</button>
    </div>
  );
};

export default ConsoleCars;
