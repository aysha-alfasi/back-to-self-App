import classes from "../components/styles/CoverPage.module.css";
import flowers from "../imgs/mainPageFlowers.png";
import cloud from "../imgs/cloud3.png";

function CoverPage() {
  return (
    <div className={classes.page}>
      <div className={classes.cloudWrapper}>
        <img src={cloud} alt="cloud" className={classes.cloud} />
      </div>

      <div className={classes.titleAndButton}>
        <h1 className={classes.mainTitle}>
          Back
          <br />
          to self
        </h1>

        <button className={classes.startButton}>Dive in</button>
      </div>
      <img src={flowers} className={classes.flowerDecor} alt="flowers" />
    </div>
  );
}

export default CoverPage;
