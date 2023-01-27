import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.NavBar}>
      <Link className={styles.NavBartext} to="/home">
        Home
      </Link>
      <Link className={styles.NavBartext} to="/create">
        Crear Pokemon
      </Link>
    </nav>
  );
};

export default NavBar;
