import { React } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./Landingpage.module.css";
import Navbar from "../Navbar/Navbar";

export default function Landingpage() {
  return (
    <div>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.main}>
          <h1 className={styles.title}>
            Planning activities for your travels was never that easy!
          </h1>
          <p className={styles.intro}>
            Choose between <span className={styles.marked}>250</span> countries,
            create new activities, and set up the difficulty, along with the
            time you'll spend on them.
          </p>
          <div className={styles.button}>
            <Link to="/main">
              <Button />
            </Link>
          </div>
        </div>
        <img
          className={styles.image}
          src="images/Lpimg.svg"
          alt="Landingpage Image"
        />
      </div>
    </div>
  );
}
