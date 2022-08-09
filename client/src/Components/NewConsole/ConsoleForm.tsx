import React from "react";
import Button from "../Ui/Button/Button";
import Select from "../Ui/Select";

type Props = {
  close?: () => void;
};

const gpio = [
  { value: "22", label: "Gpio 22" },
  { value: "23", label: "Gpio 23" },
  { value: "24", label: "Gpio 24" },
  { value: "25", label: "Gpio 25" },
  { value: "26", label: "Gpio 26" },
  { value: "27", label: "Gpio 27" },
  { value: "28", label: "Gpio 28" },
  { value: "29", label: "Gpio 29" },
];
const windowNo = [
  { value: "1", label: "Window 1" },
  { value: "2", label: "Window 2" },
  { value: "3", label: "Window 3" },
];

const ConsoleForm = ({ close }: Props) => {
  return (
    <form className="console-form">
      <label htmlFor="windows-no">Windows NO</label>
      <Select name="windows-no" options={windowNo} required />

      <label htmlFor="console-name">Console Name</label>
      <input
        type="text"
        name="console-name"
        id="console-name"
        className="primary__input"
        required
      />

      <label htmlFor="gpio-no">Gpio No</label>
      <Select name="gpio-no" options={gpio} required />
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
