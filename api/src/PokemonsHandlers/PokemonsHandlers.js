const {
  createPokemon,
  getPokemonsById,
  pokemonByName,
  getAllsPokemons,
} = require("../controllers/pokemonController");

const getPokemons = async (req, res) => {
  const { name } = req.query;

  const results = name ? await pokemonByName(name) : await getAllsPokemons();

  res.status(200).json(results);
};

const getPokemonsID = async (req, res) => {
  const { id } = req.params;
  const fuente = isNaN(id) ? "bdd" : "api";

  try {
    const pokemonID = await getPokemonsById(id, fuente);
    res.status(200).json(pokemonID);
  } catch (error) {
    res.status(400).jason({ error: error.mesage });
  }
};

const postPokemons = async (req, res) => {
  try {
    const { name, hp, attack, defense, speed, height, weight, img, types } =
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

module.exports = {
  getPokemons,
  getPokemonsID,
  postPokemons,
};
