import React from "react";
import { Link } from "react-router-dom";
import imgen from "../../img/pokemonTitle.png";
import styles from "./Landing.module.css";

export default function Landing() {
  return (
    <div className={styles.body}>
      <div className={styles.contentcontainer}>
        <img src={imgen} alt="img not found" className={styles.image} />
        <h1>CreatedBy:PSoto</h1>
        <Link to="/home">
          <button className={styles.button}>Vamoos!</button>
        </Link>
      </div>
    </div>
  );
}
