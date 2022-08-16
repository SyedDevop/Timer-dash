import React from "react";

export type SelectOptions = Array<{ value: string; label: string }>;
export interface SelectProps {
  name: string;
  className?: string;
  options: SelectOptions;
  required?: boolean;
  placeHolder: boolean;
}

const Select = ({
  name,
  className,
  options,
  required,
  placeHolder,
}: SelectProps) => {
  return (
    <select
      name={name}
      className={"primary__input " + className}
      required={required}
    >
      {placeHolder && (
        <option value="" disabled selected hidden>
          <samp color="red">Select your option</samp>
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

Select.defaultProps = {
  placeHolder: false,
};

export default Select;
