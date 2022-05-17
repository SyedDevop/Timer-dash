import { PlayIcon, MenuIcon } from "../../Assets";

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
      <div className="card-tab__body">
        <div>
          <div>
            <span>01</span>
            <h3>hour</h3>
          </div>
          <span>:</span>
          <div>
            <span>01</span>
            <h3>minutes</h3>
          </div>
          <span>:</span>
          <div>
            <span>57</span>
            <h3>seconds</h3>
          </div>
        </div>
        <button className="one">
          <PlayIcon />
        </button>
      </div>
      <button className="delete-btn">Delete Tab</button>
    </div>
  );
};

export default ConsoleCars;
