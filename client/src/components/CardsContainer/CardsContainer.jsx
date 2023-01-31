import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { useSelector } from "react-redux";

const CardsContainer = () => {
  const pokemons = useSelector((state) => state.pokemons);

  return (
    <div className={style.cards}>
      {pokemons.map((poke) => {
        return (
          <Card
            id={poke.id}
            name={poke.name}
            img={poke.img}
            types={poke.types.map((p) => p.name).join("\n")}
          />
        );
      })}
    </div>
  );
};

export default CardsContainer;
