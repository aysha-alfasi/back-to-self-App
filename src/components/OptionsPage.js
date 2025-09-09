import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDailyMessage } from "../hooks/useDailyMessage";
import DailyMessage from "./DailyMessage";
import ReflectionSpace from "./ReflectionSpace";
import ViewReflections from "./ViewReflections";
import classes from "../components/styles/OptionsPage.module.css";


const messages = ["You are enough!", "Stay present", "Be kind today!"];

const playPageFlipSound = () => {
  const audio = new Audio("/sounds/openBook.mp3");
  audio.play();
};

const playPageCloseSound = () => {
  const audio = new Audio("/sounds/cover.mp3");
  audio.play();
};

function OptionsPage({ setPage }) {
  const [view, setView] = useState("home");
  const [reflections, setReflections] = useState([]);

    const dailyMessage = useDailyMessage(messages); // The hook <♡ 

  const isFirstRender = useRef(true);


  useEffect(() => {
    if (!isFirstRender.current) {
      playPageFlipSound();
    }
  }, [view]);


  useEffect(() => {
    const storedReflections = localStorage.getItem("reflections");
    if (storedReflections) {
      setReflections(JSON.parse(storedReflections));
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("reflections", JSON.stringify(reflections));
  }, [reflections]);


  const saveReflection = (text) => {
    if (text.trim()) {
      const newEntry = {
        id: Date.now(),
        text: text.trim(),
        date: new Date().toLocaleDateString(),
      };
      setReflections([newEntry, ...reflections]);
    }
  };

  const deleteReflection = (index) => {
    const updated = [...reflections];
    updated.splice(index, 1);
    setReflections(updated);
    localStorage.setItem("reflections", JSON.stringify(updated));
  };

  const editReflection = (index, newText) => {
    const updated = [...reflections];
    updated[index].text = newText;
    setReflections(updated);
    localStorage.setItem("reflections", JSON.stringify(updated));
  };

  const goBack = () => {
    if (view === "home") {
      playPageCloseSound();
      setPage("cover");
    } else {
      playPageFlipSound();
      setView("home");
    }
  };

  return (
    <div className={classes.optionsPage}>
      <button className="backButton" onClick={goBack}>
        ← Back{" "}
      </button>
      <AnimatePresence mode="wait">
        {view === "home" && (
          <motion.div
            className={classes.motionDiv}
            key="home"
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              perspective: 1000,
              transformStyle: "preserve-3d",
              transformOrigin: "left",
              backfaceVisibility: "hidden",
            }}
          >
            <div className={classes.wrapper}>
              <div className={classes.buttons}>
                <button
                  className={classes.customButton}
                  onClick={() => setView("message")}
                >
                  Today’s Message
                </button>
                <button
                  className={classes.customButton}
                  onClick={() => setView("reflection")}
                >
                  Reflection Space
                </button>
                <button
                  className={classes.customButton}
                  onClick={() => setView("view")}
                >
                  View Reflections
                </button>
                <button
                  className={classes.customButton}
                  onClick={() => {
                    playPageCloseSound();
                    setPage("cover");
                  }}
                >
                  Back to cover
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {view === "message" && (
          <motion.div
            className={classes.motionDiv}
            key="message"
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ perspective: 1000 }}
          >
            <DailyMessage
              dailyMessage={dailyMessage}
              goBack={goBack}
            />
          </motion.div>
        )}

        {view === "reflection" && (
          <motion.div
            className={classes.motionDiv}
            key="reflection"
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ perspective: 1000 }}
          >
            <ReflectionSpace saveReflection={saveReflection} goBack={goBack} />
          </motion.div>
        )}

        {view === "view" && (
          <motion.div
            className={classes.motionDiv}
            key="view"
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ perspective: 1000 }}
          >
            <ViewReflections
              reflections={reflections}
              deleteReflection={deleteReflection}
              editReflection={editReflection}
              goBack={goBack}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default OptionsPage;
