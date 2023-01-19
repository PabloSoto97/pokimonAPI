const { Pokemon, Type } = require("../db");
const axios = require("axios");

getPokemonsById = async (id, fuente) => {
  const pokemonID =
    fuente === "api"
      ? (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data
      : await Pokemon.findByPk(id, { include: Type });

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

const getDataBase = async () => {
  return await Pokemon.findAll({
    include: Type,
  });
};

const getAllsPokemons = async () => {
  let pokemonsAll = [];
  const url = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40");
  let pokeData = url.data.results.map((p) => axios.get(p.url));

  let allPokes = pokeData;

  let results = await axios.all(allPokes).then((poke) => {
    poke.map((p) => {
      pokemonsAll.push({
        id: p.data.id,
        name: p.data.name,
        hp: p.data.stats[0].base_stat,
        attack: p.data.stats[1].base_stat,
        defense: p.data.stats[2].base_stat,
        speed: p.data.stats[5].base_stat,
        height: p.data.height,
        weight: p.data.weight,
        types: p.data.types.map((pt) => pt.type),
        img: p.data.sprites.other.home.front_default,
        created: false,
      });
    });
    return pokemonsAll;
  });
  return results;
};

const getPokemonsDbApi = async () => {
  const api = await getAllsPokemons();
  const db = await getDataBase();
  const bichos = await db.concat(api);
  return bichos;
};
const pokemonByName = async (name) => {
  const dbase = await Pokemon.findAll({ where: { name: name } });

  const api = await getAllsPokemons();

  const filteredApi = api.filter((pokemon) => pokemon.name === name);

  return [...dbase, ...filteredApi];
};
module.exports = {
  createPokemon,
  getPokemonsById,
  getPokemonsDbApi,
  pokemonByName,
};
