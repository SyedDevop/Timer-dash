import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { toast, UpdateOptions } from "react-toastify";
import { AxiosError } from "axios";

import { ConsolesApi, ResponseError } from "../../@Types";
import { fetchGpios, postConsole, updateConsole } from "../../Api";
import { parseConsoleFormData } from "../../Utils";

type postConsoleType = { type: "POST" };
type deleteConsoleType = { type: "DELETE" };
type updateConsoleType = { type: "UPDATE"; id: string };

const SAVE_TOAST_ID = "SAVE_TOAST_ID";

export type ActionType = postConsoleType | updateConsoleType;

interface UseConsoleFormProps {
  closeForm?: () => void;
  actionType: ActionType;
}
export const useConsoleForm = ({
  closeForm,
  actionType,
}: UseConsoleFormProps) => {
  const { data, isLoading } = useQuery(["gpio"], fetchGpios);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    ({ data }: { data: Omit<ConsolesApi, "id">; toastId: number | string }) => {
      if (actionType.type === "POST") {
        return postConsole(data);
      }
      return updateConsole(actionType.id, data);
    },
    {
      onSuccess: async (_, { toastId }) => {
        handelSuccessToast(toastId, actionType);
        await queryClient.invalidateQueries(["consoles"]);
        console.log("success");
        closeForm && closeForm();
      },
      onError: async (error: AxiosError<ResponseError>, { toastId }) => {
        console.log("error");
        closeForm && closeForm();
        handelErrorToast(toastId, actionType);
        error.response?.data.error.message.forEach((message) =>
          toast.error(message, {
            autoClose: false,
          })
        );
      },
    }
  );
  const handelFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Saving...", {
      updateId: SAVE_TOAST_ID,
    });
    const form = new FormData(e.currentTarget);
    const data = parseConsoleFormData(form);
    mutate({ data, toastId });
  };
  return { handelFormSubmit, isLoading, data };
};

const handelSuccessToast = (
  toastId: number | string,
  actionType: ActionType
) => {
  const DEFAULTS: UpdateOptions = {
    type: "success",
    isLoading: false,
    autoClose: 2000,
  };
  if (actionType.type === "POST") {
    toast.update(toastId, {
      render: "Console creating successfully",
      ...DEFAULTS,
    });
  } else {
    toast.update(toastId, {
      render: "Console updated successfully",
      ...DEFAULTS,
    });
  }
};

const handelErrorToast = (toastId: number | string, actionType: ActionType) => {
  const DEFAULTS: UpdateOptions = {
    type: "error",
    isLoading: false,
    autoClose: 2000,
  };
  if (actionType.type === "POST") {
    toast.update(toastId, {
      render: "Error creating console",
      ...DEFAULTS,
    });
  } else {
    toast.update(toastId, {
      render: "Error updating console",
      ...DEFAULTS,
    });
  }
};
