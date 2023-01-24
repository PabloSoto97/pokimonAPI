import style from "./Card.module.css";
import { Link } from "react-router-dom";
const Card = (props) => {
  return (
    <div className={style.card}>
      <p className={style.tittle}>Name:{props.name}</p>
      <Link to="/detail">
        <img className={style.image} src={props.img}></img>
      </Link>

      <div className={style.types}>Type:{props.types}</div>
    </div>
  );
};

export default Card;
