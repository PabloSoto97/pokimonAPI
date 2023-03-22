const { Pokemon, Type } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

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
  const typeDb = await Type.findAll({
    where: {
      name: types,
    },
  });
  newPokemon.addType(typeDb);

  return newPokemon;
};

const getDataBase = async () => {
  let pokeDb = await Pokemon.findAll({
    include: [
      {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  // let pokeTMap = pokeDb.map((p) => {
  //   return {
  //     id: p.id,
  //     name: p.name,
  //     height: p.height,
  //     weight: p.weight,
  //     hp: p.hp,
  //     attack: p.attack,
  //     defense: p.defense,
  //     speed: p.speed,
  //     img: p.img,
  //     types: p.types.map((curr) => curr.name),
  //   };
  // });

  return pokeDb;
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
  const lower = name.toLowerCase();

  const dbase = await Pokemon.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
  });

  const api = await getAllsPokemons();

  filteredApi = api.filter((pokemon) => pokemon.name == lower);

  if (filteredApi.length === 0 && dbase.length === 0) {
    return "No se Encontro el pokemon";
  }

  return [...dbase, ...filteredApi];
};

const getPokemonById = async (id, fuente) => {
  const pokemonID =
    fuente === "api"
      ? await pokemonByIdapi(id)
      : await Pokemon.findByPk(id, {
          include: {
            model: Type,
            attributes: ["name"],
            through: {
              attributes: [],
            }, // aquí se especifican los atributos que se desean seleccionar
          },
          attributes: { exclude: ["updatedAt", "createdAt"] },
        });

  return pokemonID;
};

const pokemonByIdapi = async (id) => {
  const resPoke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  let poke = resPoke;
  let getId = {
    id: poke.data.id,
    name: poke.data.name,
    hp: poke.data.stats[0].base_stat,
    attack: poke.data.stats[1].base_stat,
    defense: poke.data.stats[2].base_stat,
    speed: poke.data.stats[5].base_stat,
    height: poke.data.height,
    weight: poke.data.weight,
    types: poke.data.types.map((e) => e.type),
    img: poke.data.sprites.other.dream_world.front_default,
  };
  return getId;
};

module.exports = {
  createPokemon,
  getPokemonById,
  getPokemonsDbApi,
  pokemonByIdapi,
  pokemonByName,
};
