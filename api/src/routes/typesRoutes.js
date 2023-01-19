const { Router } = require("express");

const { getPokemonsType } = require("../PokemonsHandlers/typesHandler");

const typesRouter = Router();

typesRouter.get("/", getPokemonsType);

module.exports = typesRouter;
