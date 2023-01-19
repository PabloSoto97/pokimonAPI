const { getApiTypes } = require("../controllers/typeController");

const getPokemonsType = async (req, res) => {
  console.log("llegamos hasta el handler");
  try {
    const typess = await getApiTypes();
    res.status(200).json(typess);
  } catch (error) {
    res.status(400).json({ error: error.mesage });
  }
};

module.exports = { getPokemonsType };
