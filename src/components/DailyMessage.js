import classes from "../components/styles/NewMessage.module.css";

export default function DailyMessage({ dailyMessage }) {
  return (
    <div className={classes.section}>
      {dailyMessage ? (
        <h2 className={classes.highlightedText}>{dailyMessage}</h2>
      ) : (
        <h2>Generating your message!</h2>
      )}
    </div>
  );
}
