const { Router } = require("express");

const {
  getPokemons,
  getPokemonsID,
  postPokemons,
} = require("../PokemonsHandlers/PokemonsHandlers");

const pokemonsRouter = Router();

// const validate = (req, res, next) => {
//   const { name, hp, attack, defense, speed, height, weight, img, types } =
//     req.body;
//   if (
//     !name ||
//     !hp ||
//     !attack ||
//     !defense ||
//     !speed ||
//     !height ||
//     !weight ||
//     !img ||
//     !types
//   )
//     res.status(400).json({ error: "Falta Parametros" });

//   next();
// };

pokemonsRouter.get("/", getPokemons);

pokemonsRouter.get("/:id", getPokemonsID);

pokemonsRouter.post("/", postPokemons);

module.exports = pokemonsRouter;
