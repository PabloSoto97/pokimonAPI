import axios from "axios";
export const GET_POKEMONS = "GET_POKEMONS";
export const FILTER_TYPE = "FILTER_TYPE";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const GET_POKEMON_NAME = "GET_POKEMON_NAME";
export const GET_DETAIL = "GET_DETAIL";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const CLEAN_POKEMONS = "CLEAN_POKEMONS";
export const ORDER_NAME = "ORDER_NAME";
export const ORDER_STR = "ORDER_STR";
export const FILTER_CREATED = "FILTER_CREATED";
export const CLEAN_DETAIL = "CLEAN_DETAIL";

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
  return async (dispatch) => {
    try {
      let url = "http://localhost:3001/types";
      let json = await axios.get(url);
      return dispatch({
        type: GET_ALL_TYPES,
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
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

export const filterType = (payload) => {
  return {
    type: FILTER_TYPE,
    payload,
  };
};

export const getPokemonName = (name) => {
  return async (dispatch) => {
    try {
      var json = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
      return dispatch({
        type: GET_POKEMON_NAME,
        payload: json.data,
      });
    } catch (e) {
      alert("Pokemon not found :C");
      window.location.href = "http://localhost:3000/home";
      console.log(e);
    }
  };
};

export const filterStr = (payload) => {
  return {
    type: ORDER_STR,
    payload,
  };
};

export const orderName = (payload) => {
  return {
    type: ORDER_NAME,
    payload,
  };
};
export const cleanDetail = (dispatch) => {
  return dispatch({
    type: CLEAN_DETAIL,
    payload: [],
  });
};
export const filterCreated = (payload) => {
  return {
    type: FILTER_CREATED,
    payload,
  };
};
