import {
  GET_POKEMONS,
  GET_DETAIL,
  GET_TYPE,
  FILTER_TYPE,
  ORDER_A_Z,
  CREATE_POKEMON,
  CLEAN_POKEMONS,
} from "./actions";

const initialState = {
  pokemons: [],
  allPokemons: [],
  pokeDetail: [],
  types: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return { ...state, pokemons: action.payload };
    case GET_DETAIL:
      return {
        ...state,
        pokeDetail: action.payload,
      };
    case CLEAN_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };
    case CREATE_POKEMON:
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload],
      };
    case FILTER_TYPE:
      let allPokemons = state.allPokemons;
      let pokeFilt =
        action.payload === "All"
          ? allPokemons
          : allPokemons.filter((fi) => fi.types.includes(action.payload));
      return {
        ...state,
        pokemones: pokeFilt,
      };
    case GET_TYPE:
      return {
        ...state,
        types: action.payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
