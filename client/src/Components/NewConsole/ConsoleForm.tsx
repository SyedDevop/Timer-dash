import { useQuery } from "@tanstack/react-query";
import { GpiosApi } from "../../@Types";
import { fetchGpios } from "../../Api";

import Button from "../Ui/Button/Button";
import Select from "../Ui/Select";

type Props = {
  close?: () => void;
};

// const gpio = [
//   { value: "22", label: "Gpio 22" },
//   { value: "23", label: "Gpio 23" },
//   { value: "24", label: "Gpio 24" },
//   { value: "25", label: "Gpio 25" },
//   { value: "26", label: "Gpio 26" },
//   { value: "27", label: "Gpio 27" },
//   { value: "28", label: "Gpio 28" },
//   { value: "29", label: "Gpio 29" },
// ];
const windowNo = [
  { value: "1", label: "Window 1" },
  { value: "2", label: "Window 2" },
  { value: "3", label: "Window 3" },
];

const parseGpios = (data: GpiosApi[]) => {
  return data.map((item) => {
    return {
      value: item.io.toString(),
      label: `Gpio ${item.io}`,
    };
  });
};
const parseWindows = (data: GpiosApi[]) => {
  return data.map((item) => {
    return {
      value: item.windows?.id.toString() || "",
      label: `Window ${item.windows?.id}`,
    };
  });
};
const ConsoleForm = ({ close }: Props) => {
  const { data, isLoading, isError } = useQuery(["gpio"], fetchGpios);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <form className="console-form">
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
