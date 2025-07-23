import classes from "../components/styles/ViewReflections.module.css";

export default function ViewReflections({ reflections, goBack }) {
  return (
    <div className={classes.viewContainer}>
      <button className="backButton" onClick={goBack}>
        ← Back{" "}
      </button>
      <h2 className={classes.title}>Your Reflections</h2>

      <div className={classes.reflectionList}>
        {reflections && reflections.length > 0 ? (
          reflections.map((item, index) => (
            <div key={index} className={classes.reflectionCard}>
              {item}
            </div>
          ))
        ) : (
          <p className={classes.emptyMessage}>No reflections yet.</p>
        )}
      </div>
    </div>
  );
}
