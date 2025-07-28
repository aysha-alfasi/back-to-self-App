import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import classes from "./CustomModal.module.css";

export default function CustomModal({ children, onClose }) {
  return createPortal(
    <div className={classes.modalBackdrop} onClick={onClose}>
      <motion.div
        className={classes.modalContent}
        initial={{ rotateX: -90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        exit={{ rotateX: 90, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          perspective: 1000,
          transformStyle: "preserve-3d",
          transformOrigin: "top",
          backfaceVisibility: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={classes.modalBody}> {children}</div>
      </motion.div>
    </div>,
    document.getElementById("modal-root")
  );
}
