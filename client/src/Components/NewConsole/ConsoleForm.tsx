import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ConsolesApi } from "../../@Types";

import { fetchGpios, postConsole } from "../../Api";
import { parseGpios, parseWindows, parseConsoleFormData } from "../../Utils";
import Button from "../Ui/Button/Button";
import Select from "../Ui/Select";

type Props = {
  close?: () => void;
};

const ConsoleForm = ({ close }: Props) => {
  const { data, isLoading } = useQuery(["gpio"], fetchGpios);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (newTodo: Omit<ConsolesApi, "id">) => {
      return postConsole(newTodo);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["consoles"]);
        console.log("success");
        close && close();
      },
    }
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = parseConsoleFormData(form);
    mutate(data);
  };

  return (
    <form className="console-form" onSubmit={handelSubmit}>
      <label htmlFor="windows-no">Windows NO</label>
      <Select name="windows-no" options={parseWindows(data!)} required />

      <label htmlFor="console-name">Console Name</label>
      <input
        type="text"
        name="console-name"
        id="console-name"
        className="primary__input"
        required
      />

      <label htmlFor="gpio-no">Gpio No</label>
      <Select name="gpio-no" options={parseGpios(data!)} required />
      <div className="btn-container">
        <Button type="submit">create</Button>
        <Button textColor="red" onClick={close}>
          cancel
        </Button>
      </div>
    </form>
  );
};

export default ConsoleForm;
