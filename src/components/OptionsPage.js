import { useState } from "react";
import DailyMessage from "./DailyMessage";
import ReflectionSpace from "./ReflectionSpace";
import ViewReflections from "./ViewReflections";
import classes from "../components/styles/OptionsPage.module.css";


const messages = [
  "أنت كافية تمامًا كما أنت.",
  "خذ نفسًا عميقًا، كل شيء سيكون بخير.",
  "أنت تستحق الراحة والطمأنينة.",
];


function OptionsPage({ setPage}) {
  const [view, setView] = useState("home");
  const [dailyMessage, setDailyMessage] = useState("");
  const [reflections, setReflections] = useState([]);

  const generateMessage = () => {
    const random = messages[Math.floor(Math.random() * messages.length)];
    setDailyMessage(random);
  };


  const saveReflection = (text) => {
    if (text.trim()) {
      setReflections([...reflections, text]);
    }
  };

  const goBack = () => setView("home");

  return (
    <div className={classes.optionsPage}>
      <button className="backButton" onClick={() => setPage("cover")}>
        ← Back{" "}
      </button>

      {view === "home" && (
        <div className={classes.wrapper}>
       <div className={classes.buttons}>
       <button className={classes.customButton} onClick={() => setView("message")}>Today’s Message</button>
       <button className={classes.customButton} onClick={() => setView("reflection")}>Reflection Space</button>
       <button className={classes.customButton} onClick={() => setView("view")}>View Reflections</button>
       <button className={classes.customButton} onClick={() => setPage("cover")}>Back to cover</button>
     </div>
     </div>
      )}

      {view === "message" && (
        <DailyMessage
          dailyMessage={dailyMessage}
          generateMessage={generateMessage}
          goBack={goBack}
        />
      )}


      {view === "reflection" && (
        <ReflectionSpace
          saveReflection={saveReflection}
          goBack={goBack}
        />
      )}

{view === "view" && (
        <ViewReflections
          reflections={reflections}   
          goBack={goBack}
        />
      )}
    </div>
  );
}

export default OptionsPage;

