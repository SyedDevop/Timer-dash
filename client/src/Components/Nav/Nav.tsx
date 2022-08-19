import { useState } from "react";
import { toast } from "react-toastify";
import { AddCircle } from "../../Assets";
import { useToggle } from "../../Hooks";
import { Modal } from "../Modal";
import ConsoleForm from "../NewConsole/ConsoleForm";

const Nav = () => {
  const [modalToggle, setModelToggle] = useToggle(false);
  return (
    <nav className="nav container">
      <button aria-label="add new console" onClick={setModelToggle}>
        <AddCircle />
      </button>
      <Modal state={modalToggle} toggleModuleState={setModelToggle}>
        <ConsoleForm close={setModelToggle} actionType={{ type: "POST" }} />
      </Modal>
    </nav>
  );
};

// TODO: add tooltip to cursor on background hover.

export default Nav;
