const axios = require("axios");
const { Type } = require("../db");

const getApiTypes = async () => {
  try {
    const tiposDePokemon = [];

    await axios
      .get("https://pokeapi.co/api/v2/type")
      .then((apiTypes) => {
        apiTypes.data.results.map((pt) => tiposDePokemon.push(pt.name));
      })
      .catch((e) => console.log(e));

    const types = tiposDePokemon.map(async (pt) => {
      return await Type.findOrCreate({
        where: {
          name: pt,
        },
      }).catch((e) => console.log(e));
    });

    const allTiposDePokemon = await Type.findAll();
    return allTiposDePokemon;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getApiTypes };
