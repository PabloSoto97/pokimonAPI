const { Router } = require("express");

const {
  getPokemons,
  getPokemonsID,
  postPokemons,
} = require("../PokemonsHandlers/PokemonsHandlers");

const pokemonsRouter = Router();

pokemonsRouter.get("/", getPokemons);

pokemonsRouter.get("/:id", getPokemonsID);

pokemonsRouter.post("/", postPokemons);

module.exports = pokemonsRouter;
