import { FC } from "react";

export interface ButtonProps {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  textColor?: "green" | "red";
}

export const Button: FC<ButtonProps> = ({
  className,
  onClick,
  children,
  type,
  textColor,
}) => {
  return (
    <button
      className={`${className} ${textColor === "red" ? "btn-clr__red" : ""}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;

Button.defaultProps = {
  className: "primary__buttons",
  type: "button",
  textColor: "green",
};
