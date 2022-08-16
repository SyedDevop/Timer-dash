import { MenuIcon } from "../../../Assets";
import { useToggle } from "../../../Hooks";
import { Modal } from "../../Modal";
import ConsoleForm from "../../NewConsole/ConsoleForm";

interface Props {
  consoleName: string;
  consoleID: string;
}

export const ConsoleMenu = ({ consoleID, consoleName }: Props) => {
  const [menuState, setMenuState] = useToggle(false);
  return (
    <>
      <button
        aria-label="console car setting"
        className="console-btn"
        onClick={setMenuState}
      >
        <MenuIcon />
      </button>
      <Modal state={menuState} toggleModuleState={setMenuState}>
        <ConsoleForm
          close={setMenuState}
          okButtonText="update"
          consoleRequired={false}
          gpioRequired={false}
          windowRequired={false}
          actionType={{ type: "UPDATE", id: consoleID }}
        />
      </Modal>
    </>
  );
};

export default ConsoleMenu;
