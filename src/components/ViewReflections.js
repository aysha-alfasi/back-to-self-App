import { useState } from "react";
import classes from "../components/styles/ViewReflections.module.css";

export default function ViewReflections({
  reflections,
  deleteReflection,
  editReflection,
}) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");

  const startEditing = (index, item) => {
    setEditingIndex(index);
    setEditedText(item.text);
  };

  const saveEdit = () => {
    if (editedText.trim()) {
      editReflection(editingIndex, editedText.trim());
      setEditingIndex(null);
      setEditedText("");
    }
  };

  return (
    <div className={classes.viewContainer}>
      <h2 className={classes.title}>Your Reflections</h2>

      <div className={classes.reflectionList}>
        {reflections && reflections.length > 0 ? (
          reflections.map((item, index) => (
            <div key={index} className={classes.reflectionCard}>
              {editingIndex === index ? (
                <>
                  <div
                    className={classes.editableDiv}
                    contentEditable
                    suppressContentEditableWarning={true}
                    onInput={(e) => setEditedText(e.currentTarget.innerText)}
                  >
                    {editedText}
                  </div>
                  <button onClick={saveEdit} className={classes.saveButton}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p>{item.text}</p>
                  <div className={classes.buttonGroup}>
                    <button
                      onClick={() => startEditing(index, item)}
                      className={classes.editButton}
                    >
                    Edit
                    </button>
                    <button
                      onClick={() => deleteReflection(index)}
                      className={classes.deleteButton}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p className={classes.emptyMessage}>No reflections yet.</p>
        )}
      </div>
    </div>
  );
}
