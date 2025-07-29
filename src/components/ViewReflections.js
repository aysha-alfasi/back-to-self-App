import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import CustomModal from "./UI/CustomModal";
import classes from "../components/styles/ViewReflections.module.css";



const playPageFlipSound = () => {
  const audio = new Audio("/sounds/openBook.mp3");
  audio.play();
};

export default function ViewReflections({
  reflections,
  deleteReflection,
  editReflection,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [originalText, setOriginalText] = useState("");


  const editRef = useRef(null);

  useEffect(() => {
    if (isEditing && editRef.current) {
      editRef.current.innerText = editedText;
    }
  }, [isEditing, editedText]);

  const handleReadMore = (index) => {
    setActiveIndex(index);
    setEditedText(reflections[index].text);
    setIsModalOpen(true);
    setIsEditing(false);
    playPageFlipSound();
    setModalType("view");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveIndex(null);
    setIsEditing(false);
    playPageFlipSound();
    setEditedText("");
    setModalType("");
  };

  const startEditingInModal = () => {
    setOriginalText(reflections[activeIndex].text);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditedText(reflections[activeIndex].text);
  };

  const saveEdit = () => {
    if (!editRef.current) return;
    const newText = editRef.current.innerText.trim();
    if (!newText) {
      setModalType("emptyEdit");
      return;
    }

    if (newText === originalText) {
      setModalType("noChanges");
      setIsModalOpen(true);
      return;
    }


 
setOriginalText(newText);
setEditedText(newText);
    setIsEditing(false);
    setModalType("confirmEdit");

    editReflection(activeIndex, newText);

  };

  const confirmDelete = () => {
    setModalType("confirmDelete");
  };

  const handleDelete = () => {
    deleteReflection(activeIndex);
    setModalType("deleteSuccess");
    setIsEditing(false);
  };

  return (
    <div className={classes.viewContainer}>
      <div className={classes.reflectionList}>
        {reflections && reflections.length > 0 ? (
          reflections.map((item, index) => (
            <div key={index} className={classes.reflectionCard}>
              <p className={classes.previewText}>
                {item.text.split("\n")[0].slice(0, 20)}...
              </p>
              <div className={classes.buttonGroup}>
                <button
                  onClick={() => handleReadMore(index)}
                  className={classes.readMoreButton}
                >
                  Read more
                </button>
                <button
                  onClick={() => {
                    setActiveIndex(index);
                    confirmDelete();
                    setIsModalOpen(true);
                  }}
                  className={classes.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={classes.emptyMessage}>No reflections yet.</p>
        )}
      </div>
      <AnimatePresence>
      {isModalOpen && (
        <CustomModal onClose={closeModal}>
          {modalType === "view" &&
            activeIndex !== null &&
            (!isEditing ? (
              <>
                <div className={classes.fullText}>
                  {reflections[activeIndex].text}
                </div>
                <div className={classes.modalButtons}>
                  <button onClick={startEditingInModal}>Edit</button>
                  <button onClick={confirmDelete}>Delete</button>
                  <button onClick={closeModal}>Close</button>
                </div>
              </>
            ) : (
              <>
                <div
                  className={classes.editableDiv}
                  contentEditable
                  ref={editRef}
                  data-placeholder="Edit your reflection..."
                  data-testid="edit-area"
                  suppressContentEditableWarning={true}
                />
                <div className={classes.modalButtons}>
                  <button onClick={saveEdit} className={classes.saveButton}>
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className={classes.cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ))}

          {modalType === "confirmDelete" && (
            <div className={classes.modalMessage}>
              <p>Are you sure you want to delete this reflection?</p>
              <div className={classes.modalButtons}>
                <button onClick={handleDelete}>Yes, delete</button>
                <button onClick={closeModal}>Cancel</button>
              </div>
            </div>
          )}

          {modalType === "deleteSuccess" && (
            <div className={classes.modalMessage}>
              <p>Reflection deleted successfully! 🗑️</p>
              <div className={classes.modalButtons}>
                <button onClick={closeModal}>Close</button>
              </div>
            </div>
          )}

          {modalType === "emptyEdit" && (
            <div className={classes.modalMessage}>
              <p>You cannot save an empty reflection!</p>
              <div className={classes.modalButtons}>
                <button onClick={() => setModalType("view")}>Back</button>
              </div>
            </div>
          )}

{modalType === "noChanges" && (
            <div className={classes.modalMessage}>
              <p>You didn't make any changes 😊</p>
              <div className={classes.modalButtons}>
                <button onClick={closeModal}>ok</button>
              </div>
            </div>
          )}

          {modalType === "confirmEdit" && (
            <div className={classes.modalMessage}>
              <p>Your reflection was updated successfully!</p>
              <div className={classes.modalButtons}>
                <button onClick={closeModal}>Close</button>
              </div>
            </div>
          )}
        </CustomModal>
      )}
      </AnimatePresence>

    </div>
  );
}
