import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { ConsolesApi } from "../../@Types";
import { fetchGpios, postConsole, updateConsole } from "../../Api";
import { parseConsoleFormData } from "../../Utils";

type postConsoleType = { type: "POST" };
type deleteConsoleType = { type: "DELETE" };
type updateConsoleType = { type: "UPDATE"; id: string };

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
    (newTodo: Omit<ConsolesApi, "id">) => {
      if (actionType.type === "POST") {
        return postConsole(newTodo);
      }
      return updateConsole(actionType.id, newTodo);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["consoles"]);
        console.log("success");
        closeForm && closeForm();
      },
    }
  );
  const handelFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = parseConsoleFormData(form);
    mutate(data);
  };
  return { handelFormSubmit, isLoading, data };
};
