import { createPortal } from "react-dom";
import classes from "./CustomModal.module.css";

export default function CustomModal({ children, onClose }) {
  return createPortal(
    <div className={classes.modalBackdrop} onClick={onClose}>
      <div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={classes.modalBody}> {children}</div>
       
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
