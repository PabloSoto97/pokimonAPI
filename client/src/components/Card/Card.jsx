import style from "./Card.module.css";
import { NavLink } from "react-router-dom";
const Card = (props) => {
  return (
    <NavLink to={`/pokemons/${props.id}`}>
      <div className={style.card}>
        <p className={style.tittle}>Name: {props.name}</p>

        <img className={style.image} src={props.img}></img>

        <div className={style.types}>Type: {props.types}</div>
      </div>
    </NavLink>
  );
};

export default Card;
