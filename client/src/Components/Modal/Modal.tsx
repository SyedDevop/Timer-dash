import React, { FC } from "react";
import { CSSTransition } from "react-transition-group";
import CloseIcon from "@mui/icons-material/Close";
type Props = {
  toggleModuleState?: () => void;
  state: boolean;
  children?: React.ReactNode;
};

export const Modal: FC<Props> = ({ toggleModuleState, state, children }) => {
  const close = (
    e: React.MouseEvent<HTMLElement | SVGSVGElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      toggleModuleState && toggleModuleState();
    }
  };
  return (
    <CSSTransition
      in={state}
      timeout={100}
      classNames="modal"
      unmountOnExit
      mountOnEnter
    >
      <>
        <main className="modal__background" onClick={close}>
          <div className="modal__body">
            <button type="button" className="body-close-btn" onClick={close}>
              <CloseIcon className="close-icon" />
            </button>
            {children}
          </div>
        </main>
      </>
    </CSSTransition>
  );
};
