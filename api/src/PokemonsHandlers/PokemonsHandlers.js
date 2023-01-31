const axios = require("axios");
const { Pokemon, Type } = require("../db");

const {
  createPokemon,
  getPokemonById,
  getPokemonsDbApi,
  pokemonByName,
} = require("../controllers/pokemonController");

const getPokemons = async (req, res) => {
  const { name } = req.query;

  try {
    const results = name ? await pokemonByName(name) : await getPokemonsDbApi();

    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.masage });
  }
};

const getPokemonsID = async (req, res) => {
  const { id } = req.params;
  const fuente = isNaN(id) ? "bdd" : "api";
  try {
    const pokemonID = await getPokemonById(id, fuente);
    res.status(200).json(pokemonID);
  } catch (error) {
    res.status(400).json({ error: error.mesage });
  }
};

const postPokemons = async (req, res) => {
  try {
    const { name, hp, attack, defense, speed, img, height, weight, types } =
      req.body;

    const newPokemon = await createPokemon(
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      img,
      types
    );
    res.status(200).json(newPokemon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPokemonsType = async (req, res) => {
  try {
    const typess = await getApiTypes();
    res.status(200).json(typess);
  } catch (error) {
    res.status(400).json({ error: error.mesage });
  }
};

module.exports = {
  getPokemons,
  getPokemonsID,
  postPokemons,
  getPokemonsType,
};
