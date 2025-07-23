import classes from "../components/styles/NewMessage.module.css";

export default function DailyMessage({
  dailyMessage,
  generateMessage,
  goBack,
}) {
  return (
    <div className={classes.section}>
      <button className="backButton" onClick={goBack}>
        ← Back{" "}
      </button>
      {dailyMessage ? (
  <h2 className={classes.highlightedText}>{dailyMessage}</h2>
) : (
  <h2>Click once you're ready!</h2>
)}

      <button className={classes.btn} onClick={generateMessage}>
        Check Today's Message✨
      </button>
    </div>
  );
}
