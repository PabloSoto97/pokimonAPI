import axios from "axios";
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_TYPE = "GET_TYPE";
export const GET_DETAIL = "GET_DETAIL";
export const FILTER_TYPE = "FILTER_TYPE";
export const ORDER_A_Z = "ORDER_A_Z";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const CLEAN_POKEMONS = "CLEAN_POKEMONS";

export const getPokemons = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/pokemons");
    const pokemons = apiData.data;
    dispatch({ type: GET_POKEMONS, payload: pokemons });
  };
};
export const postPokemon = (payload) => {
  return async () => {
    try {
      var createPoke = await axios.post(
        "http://localhost:3001/pokemons",
        payload
      );
      console.log(createPoke);
      alert("New pokemón is created!");
      return createPoke;
    } catch (e) {
      alert("Pokemon name already exist");
      console.log(e);
    }
  };
};
export const cleanPokemons = (dispatch) => {
  return dispatch({
    type: CLEAN_POKEMONS,
    payload: [],
  });
};
export const getAlltypes = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/types");
    const type = apiData.data;
    dispatch({ type: GET_TYPE, payload: type });
  };
};

export const getDetail = (id) => {
  return async function (dispatch) {
    const details = await axios(`http://localhost:3001/pokemons/${id}`);
    return dispatch({
      type: GET_DETAIL,
      payload: details.data,
    });
  };
};

export const filterPokemonesType = (payload) => {
  return {
    type: "FILTER_TYPE",
    payload,
  };
};

export const orderA_Z = (payload) => {
  return {
    type: "ORDER_A_Z",
    payload,
  };
};
