import { toast } from "react-toastify";

import { parseGpios, parseWindows } from "../../Utils";
import Button from "../Ui/Button/Button";
import Select from "../Ui/Select";
import { useConsoleForm, ActionType } from "./useConsoleForm";

type Props = {
  close?: () => void;
  okButtonText: string;
  cancelButtonText: string;
  consoleRequired: boolean;
  gpioRequired: boolean;
  windowRequired: boolean;
  actionType: ActionType;
};

const ConsoleForm = ({
  close,
  cancelButtonText,
  okButtonText,
  consoleRequired,
  gpioRequired,
  windowRequired,
  actionType,
}: Props) => {
  const { data, handelFormSubmit, isLoading } = useConsoleForm({
    closeForm: close,
    actionType,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form className="console-form" onSubmit={handelFormSubmit}>
      <label htmlFor="windows-no">Windows NO</label>
      <Select
        name="windows-no"
        options={parseWindows(data!)}
        required={windowRequired}
        placeHolder={!windowRequired}
      />

      <label htmlFor="console-name">Console Name</label>
      <input
        type="text"
        name="console-name"
        id="console-name"
        className="primary__input"
        required={consoleRequired}
      />

      <label htmlFor="gpio-no">Gpio No</label>
      <Select
        name="gpio-no"
        options={parseGpios(data!)}
        required={gpioRequired}
        placeHolder={!gpioRequired}
      />
      <div className="btn-container">
        <Button type="submit">{okButtonText}</Button>
        <Button textColor="red" onClick={close}>
          {cancelButtonText}
        </Button>
      </div>
    </form>
  );
};

ConsoleForm.defaultProps = {
  cancelButtonText: "cancel",
  okButtonText: "create",
  consoleRequired: true,
  gpioRequired: true,
  windowRequired: true,
};

export default ConsoleForm;
