import { useRef, useState } from "react";
import CustomModal from "../components/UI/CustomModal";
import classes from "../components/styles/ReflectionPage.module.css";

export default function ReflectionWritingArea({ onSave }) {
  const [showModal, setShowModal] = useState(false);

  const contentRef = useRef(null);

  const handleSaveClick = () => {
    const text = contentRef.current.innerText.trim();
    if (text) {
      onSave(text);
      contentRef.current.innerText = "";
      setShowModal(true);
      setTimeout(() => setShowModal(false), 3000);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={classes.reflectionEditor}>
      <div
        className={classes.writingArea}
        contentEditable
        ref={contentRef}
        data-placeholder="Type here..."
        suppressContentEditableWarning={true}
      />

      <button onClick={handleSaveClick} className={classes.saveButton}>
        Save
      </button>

      {showModal && (
        <CustomModal onClose={() => setShowModal(false)}>
          <p className={classes.successMessage}>Your Reflection is added 🌸</p>
          <button className={classes.okModal} onClick={closeModal}>
            Ok
          </button>
        </CustomModal>
      )}
    </div>
  );
}
