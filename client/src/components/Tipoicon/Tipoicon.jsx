import React from "react";
import bug from "../../tiposPoke/bug.png";
import dark from "../../tiposPoke/dark.png";
import dragon from "../../tiposPoke/dragon.png";
import electric from "../../tiposPoke/electric.png";
import fairy from "../../tiposPoke/fairy.png";
import fighting from "../../tiposPoke/fighting.png";
import fire from "../../tiposPoke/fire.png";
import flying from "../../tiposPoke/flying.png";
import grass from "../../tiposPoke/grass.png";
import ground from "../../tiposPoke/ground.png";
import ice from "../../tiposPoke/ice.png";
import normal from "../../tiposPoke/normal.png";
import poison from "../../tiposPoke/poison.png";
import psychic from "../../tiposPoke/psychic.png";
import rock from "../../tiposPoke/rock.png";
import steel from "../../tiposPoke/steel.png";
import water from "../../tiposPoke/water.png";
import unknown from "../../tiposPoke/unknown.png";
import shadow from "../../tiposPoke/shadow.png";
import ghost from "../../tiposPoke/ghost.png";
import "./Tipoicon.module.css";

export default function Tipoicon({ name, handleFilters }) {
  const types = {
    bug: bug,
    dark: dark,
    dragon: dragon,
    electric: electric,
    fairy: fairy,
    fighting: fighting,
    fire: fire,
    flying: flying,
    grass: grass,
    ground: ground,
    ice: ice,
    normal: normal,
    poison: poison,
    psychic: psychic,
    rock: rock,
    steel: steel,
    water: water,
    unknown: unknown,
    shadow: shadow,
    ghost: ghost,
  };
  return (
    <>
      <img className="type-img" src={types[name]} alt={`${name}`} />
    </>
  );
}
