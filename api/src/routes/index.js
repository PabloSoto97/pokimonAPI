const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonsRouter = require("./pokemonsRouter");
const typesRoutes = require("./typesRoutes");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/pokemons", pokemonsRouter);
router.use("/types", typesRoutes);

module.exports = router;
