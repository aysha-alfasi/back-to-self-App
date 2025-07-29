import { useRef, useState } from "react";
import CustomModal from "../components/UI/CustomModal";
import classes from "../components/styles/ReflectionPage.module.css";

const playPageFlipSound = () => {
  const audio = new Audio("/sounds/openBook.mp3");
  audio.play();
};

export default function ReflectionWritingArea({ onSave, goBack }) {
  const [showModal, setShowModal] = useState(false);

  const contentRef = useRef(null);

  const handleSaveClick = () => {
    const text = contentRef.current.innerText.trim();
    if (text) {
      onSave(text);
      contentRef.current.innerText = "";
      playPageFlipSound();
      setShowModal(true);
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
        data-testid="writing-area"
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
          <button className={classes.okModal} onClick={goBack}>
            Go home
          </button>
        </CustomModal>
      )}
    </div>
  );
}
