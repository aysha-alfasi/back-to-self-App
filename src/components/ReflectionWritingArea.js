import { useRef } from "react";
import classes from "../components/styles/ReflectionPage.module.css";

export default function ReflectionWritingArea({ onSave, goBack }) {
  const contentRef = useRef(null);

  const handleSaveClick = () => {
    const text = contentRef.current.innerText.trim();
    if (text) {
      onSave(text);
      contentRef.current.innerText = "";
    }
  };

  return (
    <div className={classes.reflectionEditor}>
      <button className="backButton" onClick={goBack}>
        ← Back
      </button>

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
    </div>
  );
}
