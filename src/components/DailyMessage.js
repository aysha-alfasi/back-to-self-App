import { useEffect } from "react";
import classes from "../components/styles/NewMessage.module.css";

export default function DailyMessage({ dailyMessage, generateMessage }) {

  useEffect(() => {
    generateMessage();
  }, [generateMessage]);
  

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
