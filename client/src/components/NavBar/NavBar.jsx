import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={style.mainContainer}>
      <Link to="/home">Home</Link>
      <Link to="/create">CreatePokemon</Link>
    </div>
  );
};
export default NavBar;
