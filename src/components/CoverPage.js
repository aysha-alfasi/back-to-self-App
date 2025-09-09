import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import classes from "../components/styles/CoverPage.module.css";
import flowers from "../imgs/mainPageFlowers.png";
import cloud from "../imgs/cloud3.png";

const playPageFlipSound = () => {
  const audio = new Audio("/sounds/openBook.mp3");
  audio.play();
};

function CoverPage({ onDiveIn }) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload images <♡ />
  useEffect(() => {
    const images = [cloud, flowers];
    let loadedCount = 0;

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount += 1;
        if (loadedCount === images.length) {
          setIsLoaded(true); // All images are ready <♡
        }
      };
    });
  }, []);

  const handleClick = () => {
    playPageFlipSound();
    onDiveIn();
  };

  return (
    <>
      {!isLoaded && <div className={classes.loader}>Loading...</div>}

      {isLoaded && (
        <div className={classes.page}>
          <div className={classes.cloudWrapper}>
            <img src={cloud} alt="cloud" className={classes.cloud} />
          </div>

          <div className={classes.titleAndButton}>
            <motion.h1
              className={classes.mainTitle}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.42, 0, 0.58, 1] }}
            >
              Back
              <br />
              to self
            </motion.h1>

            <button className={classes.startButton} onClick={handleClick}>
              Dive in
            </button>
          </div>

          <img src={flowers} className={classes.flowerDecor} alt="flowers" />
        </div>
      )}
    </>
  );
}

export default CoverPage;
