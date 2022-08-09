import React from "react";

type Props = {
  text: string;
};

export const ToolTip = ({ text }: Props) => {
  return <div id="tool-tip">{text}</div>;
};
