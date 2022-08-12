import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { GpiosApi } from "../../@Types";
import { fetchGpios, myAxios } from "../../Api";
import Button from "../Ui/Button/Button";
import Select from "../Ui/Select";

type Props = {
  close?: () => void;
};

const parseGpios = (data: GpiosApi[]) => {
  return data.map((item) => {
    return {
      value: item.io.toString(),
      label: `Gpio ${item.io}`,
    };
  });
};
const parseWindows = (data: GpiosApi[]) => {
  const windows = data.map((item) => {
    return {
      value: item.windows?.id.toString() || "",
      label: `Window ${item.windows?.id}`,
    };
  });
  return windows.filter(
    (value, index, self) =>
      index === self.findIndex((item) => item.value === value.value)
  );
};
const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = new FormData(e.target as HTMLFormElement);
  console.log();
  // @ts-ignore
  // axios.post("http://localhost:3001/api/gpios", form, {
  //   headers: { "content-type": "application/x-www-form-urlencoded" },
  //   data: form,
  // });
};
const ConsoleForm = ({ close }: Props) => {
  const { data, isLoading } = useQuery(["gpio"], fetchGpios);

  if (isLoading) {
    return <div>Loading...</div>;
  }
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
