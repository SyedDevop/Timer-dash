import React from "react";

export type SelectOptions = Array<{ value: string; label: string }>;
export interface SelectProps {
  name: string;
  className?: string;
  options: SelectOptions;
  required?: boolean;
}

const Select = ({ name, className, options, required }: SelectProps) => {
  return (
    <select
      name={name}
      className={"primary__input " + className}
      required={required}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
