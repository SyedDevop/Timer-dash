import { useState } from "react";
import { AddCircle } from "../../Assets";
import { Modal } from "../Modal";
import ConsoleForm from "../NewConsole/ConsoleForm";

const Nav = () => {
  const [modalToggle, setModalToggle] = useState(false);
  function toggleModule() {
    setModalToggle((pre) => !pre);
    console.log("close");
  }
  return (
    <nav className="nav container">
      <button aria-label="add new console" onClick={toggleModule}>
        <AddCircle />
      </button>
      <Modal state={modalToggle} toggleModuleState={toggleModule}>
        <ConsoleForm close={toggleModule} />
      </Modal>
    </nav>
  );
};

// TODO: add tooltip to cursor on background hover.

export default Nav;
