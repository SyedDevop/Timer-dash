import React, { PropsWithChildren } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
type Props = {
  header: string;
  message?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  confirmText: string;
};

const Warning = ({
  header,
  message,
  onCancel,
  onConfirm,
  confirmText,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div className="warring">
      <h1>{header}</h1>
      {message && <p>{message}</p>}
      <p>{children}</p>
      <div className="btn-container">
        <button className="btn warring-btn" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn warring-btn conform-btn" onClick={onConfirm}>
          {confirmText}
          <DeleteForeverIcon />
        </button>
      </div>
    </div>
  );
};

export default Warning;
