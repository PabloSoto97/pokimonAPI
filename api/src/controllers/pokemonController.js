const { Pokemon, Type } = require("../db");
const axios = require("axios");

getPokemonsById = async (id) => {
  // const pokemonID =
  //   fuente === "api"
  //     ? (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data
  //     : await Pokemon.findByPk(id, { include: Type });

  // return pokemonID;

  let pokemonID;

  if (isNaN(id)) {
    pokemonID = await Pokemon.findOne({
      where: { id },
      include: [
        {
          model: Types,
          attributes: ["name"],
        },
      ],
    });

    if (!pokemonID) {
      res.status(404).json({ message: "No se Encontro el Pokemon" });
    } else {
      pokemonID = {
        id: pokemon.id,
        name: pokemon.name,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        speed: pokemon.speed,
        height: pokemon.height,
        weight: pokemon.weight,
        image: pokemon.image,
        types: pokemon.types.map((el) => el.name),
      };
      res.json(pokemonID);
    }
  } else {
    const apiPokemon = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    // Procesamos la respuesta de la API
    pokemonID = {
      id: apiPokemon.data.id,
      name: apiPokemon.data.name,
      hp: apiPokemon.data.stats[0].base_stat,
      attack: apiPokemon.data.stats[1].base_stat,
      defense: apiPokemon.data.stats[2].base_stat,
      speed: apiPokemon.data.stats[5].base_stat,
      height: apiPokemon.data.height,
      weight: apiPokemon.data.weight,
      image: apiPokemon.data.sprites.other.home.front_default,
      types: apiPokemon.data.types.map((el) => el.type.name),
    };
    // Validamos si el Pokémon existe
    if (!pokemonID) {
      res.status(404).json({ message: "Pokemon not found" });
    } else {
      // Respondemos al cliente con el Pokémon
      res.json(pokemonID);
    }
  }
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
