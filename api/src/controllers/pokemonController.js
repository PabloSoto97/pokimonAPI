const { Pokemon } = require("../db");
const axios = require("axios");

getPokemonsById = async (id, fuente) => {
  const pokemonID =
    fuente === "api"
      ? (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data
      : await Pokemon.findByPk(id);
  return pokemonID;
};

const createPokemon = async (
  name,
  hp,
  attack,
  defense,
  speed,
  height,
  weight,
  img,
  types
) => {
  const newPokemon = await Pokemon.create({
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    img,
    types,
  });
  return newPokemon;
};

const cleanPokemons = (arr) => {
  const clean = arr.map((elem) => {
    return {
      id: elem.id,
      name: elem.name,
      hp: elem.hp,
      attack: elem.attack,
      defense: elem.defense,
      speed: elem.speed,
      height: elem.height,
      weight: elem.weight,
      img: elem.img,
      types: elem.types,
      created: false,
    };
  });
  return clean;
};

const getAllsPokemons = async () => {
  const dataBPoke = await Pokemon.findAll();

  const apiPokemonsRaw = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=100"
  );

  const apiPokemons = cleanPokemons(apiPokemonsRaw);

  return [...apiPokemons, ...dataBPoke];
};

const pokemonByName = async (name) => {
  const dataBasePoke = await Pokemon.findAll({ where: { name: name } });

  const apiPokemonsRaw = (await axios.get("https://pokeapi.co/api/v2/pokemon"))
    .data;

  const apiPokemons = cleanPokemons(apiPokemonsRaw);

  const apifilter = apiPokemons.filter((pokemon) => {
    pokemon.name === name;
  });
  return [...apifilter, ...dataBasePoke];
};

module.exports = {
  createPokemon,
  getPokemonsById,
  pokemonByName,
  getAllsPokemons,
};
