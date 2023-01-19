const axios = require("axios");
const { json } = require("sequelize");

const {
  createPokemon,
  getPokemonsById,
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
  try {
    const { id } = req.params;

    let pokemon;
    if (isNaN(id)) {
      // Buscamos el Pokémon en la base de datos
      pokemon = await Pokemon.findOne({
        where: { id },
        include: [
          {
            model: Types,
            attributes: ["name"],
          },
        ],
      });
      // si no se encuentra en la base de datos
      if (!pokemon) {
        res.status(404).json({ message: "No se Encontro el Pokemon" });
      } else {
        // si se encuentra en la base de datos
        pokemon = {
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
        res.json(pokemon);
      }
    } else {
      // si es un numero busca en la api
      const apiPokemon = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      // Procesamos la respuesta de la API
      pokemon = {
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
      if (!pokemon) {
        res.status(404).json({ message: "Pokemon not found" });
      } else {
        // Respondemos al cliente con el Pokémon
        res.json(pokemon);
      }
    }
  } catch (error) {
    res.send(400).json({ error: error.mesage });
  }

  //   const { id } = req.params;
  //   const fuente = isNaN(id) ? "bdd" : "api";
  //   try {
  //     const pokemonID = await getPokemonsById(id, fuente);
  //     res.status(200).json(pokemonID);
  //   } catch (error) {
  //     res.status(400).json({ error: error.mesage });
  //   }
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
