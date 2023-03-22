import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import "./styles.css";

const Detail = (props) => {
  const dispatch = useDispatch();

  const pokemon = useSelector((state) => state.pokeDetail);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  return (
    <div className="detail-container">
      <div className="tittle-image-pos">
        <div className="detail-tittle">
          <p className="pokemon-name">{pokemon.name}</p>
          <p className="pokemon-id">
            ID: {pokemon.idPoke ? pokemon.idPoke : pokemon.id}
          </p>
        </div>
        <br />
        <div>
          <img
            className="detail-image"
            src={pokemon.img}
            alt={`${pokemon.name}`}
          />
        </div>
      </div>
      <div className="detail-data">
        <p>Health Points {pokemon.hp}</p>
        <p>Attack Points{pokemon.attack}</p>
        <p>Defense Points {pokemon.defense}</p>
        <p>Speed Points {pokemon.speed}</p>
        <p>Height {pokemon.height}</p>
        <p>Weight {pokemon.weight}</p>
        <p>Types: {pokemon.types?.map((e) => e.name + " ")}</p>
        {/* <p>
          Types:
          {pokemon.types?.map((el) => {
            return (
              <p key={`${el}_${id}`} className="one-third">
                <p class="stat-value">{el}</p>
              </p>
            );
          })}
        </p> */}
        {/* {pokemon.types?.map((el) => {
          return (
            <div key={`${el}_${id}`} className="one-third">
              <div class="stat-value">{el}</div>
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default Detail;
