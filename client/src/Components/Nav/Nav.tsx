import { AddCircle } from "../../Assets";

const Nav = () => {
  return (
    <nav className="nav container">
      <button aria-label="add new console">
        <AddCircle />
      </button>
    </nav>
  );
};

export default Nav;
