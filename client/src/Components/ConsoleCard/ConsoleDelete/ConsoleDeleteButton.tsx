import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Modal } from "../../Modal";
import Warning from "../../Ui/PopUp/Warning";
import { deleteConsole } from "../../../Api";

type Props = {
  consoleName: string;
  consoleID: string;
};

export const ConsoleDeleteButton = ({ consoleName, consoleID }: Props) => {
  const [modalToggle, setModalToggle] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (id: string) => {
      return deleteConsole(id);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["consoles"]);
        console.log("success");
        toggleModule();
      },
    }
  );

  function toggleModule() {
    setModalToggle((pre) => !pre);
    console.log("close");
  }
  return (
    <>
      <button className="delete-btn console-btn" onClick={toggleModule}>
        Delete Tab
      </button>
      <Modal state={modalToggle} toggleModuleState={toggleModule}>
        <Warning
          header="Delete Console ?"
          confirmText="Delete console"
          onCancel={toggleModule}
          onConfirm={() => mutate(consoleID)}
        >
          Are you sure want to delete <strong>"{consoleName}"</strong>? <br />
          This action cannot be undone.
        </Warning>
      </Modal>
    </>
  );
};

export default ConsoleDeleteButton;
