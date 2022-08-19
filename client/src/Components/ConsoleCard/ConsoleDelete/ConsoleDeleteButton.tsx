import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Modal } from "../../Modal";
import Warning from "../../Ui/PopUp/Warning";
import { deleteConsole } from "../../../Api";
import { useToggle } from "../../../Hooks";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { ResponseError } from "../../../@Types";

type Props = {
  consoleName: string;
  consoleID: string;
};

export const ConsoleDeleteButton = ({ consoleName, consoleID }: Props) => {
  const [modalToggle, setModalToggle] = useToggle(false);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    ({ id }: { id: string; toastId: string | number }) => {
      return deleteConsole(id);
    },
    {
      onSuccess: async (_, { toastId }) => {
        toast.update(toastId, {
          render: "Console deleted",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        await queryClient.invalidateQueries(["consoles"]);
        console.log("success");
        setModalToggle();
      },
      onError: async (err: AxiosError<ResponseError>, { toastId }) => {
        toast.update(toastId, {
          render: "Error deleting console",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
        err.response?.data?.error?.message.forEach((error) => {
          toast.error(error);
        });
      },
    }
  );

  return (
    <>
      <button className="delete-btn console-btn" onClick={setModalToggle}>
        Delete Tab
      </button>
      <Modal state={modalToggle} toggleModuleState={setModalToggle}>
        <Warning
          header="Delete Console ?"
          confirmText="Delete console"
          onCancel={setModalToggle}
          onConfirm={() => {
            const toastId = toast.loading("Deleting console...");
            mutate({ id: consoleID, toastId });
          }}
        >
          Are you sure want to delete <strong>"{consoleName}"</strong>? <br />
          This action cannot be undone.
        </Warning>
      </Modal>
    </>
  );
};

export default ConsoleDeleteButton;
