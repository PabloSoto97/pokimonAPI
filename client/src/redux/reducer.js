import {
  GET_POKEMONS,
  GET_DETAIL,
  GET_ALL_TYPES,
  FILTER_TYPE,
  GET_POKEMON_NAME,
  CREATE_POKEMON,
  CLEAN_POKEMONS,
  ORDER_NAME,
  ORDER_STR,
  FILTER_CREATED,
  CLEAN_DETAIL,
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
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        pokeDetail: action.payload,
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        pokeDetail: action.payload,
      };
    case FILTER_CREATED:
      let copy = state.allPokemons;
      let createdFiltered;
      if (action.payload === "created") {
        createdFiltered = copy.filter((e) => e.createdMyDb);
      } else if (action.payload === "api") {
        createdFiltered = copy.filter((e) => !e.createdMyDb);
      } else {
        createdFiltered = copy;
      }
      return {
        ...state,
        pokemons: createdFiltered,
      };
    case ORDER_NAME:
      let ordName = [...state.allPokemons];
      let pokeByName =
        action.payload === "All"
          ? ordName
          : action.payload === "asc"
          ? ordName.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
              } else {
                return 0;
              }
            })
          : ordName.sort((a, b) => {
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return 1;
              } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              } else {
                return 0;
              }
            });
      return {
        ...state,
        pokemons: pokeByName,
      };
    case ORDER_STR:
      let orderAttack = [...state.allPokemons];
      let pokeAttack =
        action.payload === "All"
          ? orderAttack
          : action.payload === "asc"
          ? orderAttack.sort((a, b) => {
              if (a.attack > b.attack) {
                return 1;
              } else if (a.attack < b.attack) {
                return -1;
              } else {
                return 0;
              }
            })
          : orderAttack.sort((a, b) => {
              if (a.attack < b.attack) {
                return 1;
              } else if (a.attack > b.attack) {
                return -1;
              } else {
                return 0;
              }
            });
      return {
        ...state,
        pokemons: pokeAttack,
      };
    case GET_POKEMON_NAME:
      return {
        ...state,
        pokemons: action.payload,
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
      let copyTwo = state.pokemons;
      let typeFiltered =
        action.payload === "all"
          ? copyTwo
          : copyTwo.filter((e) =>
              e.types.some((e) => e.name === action.payload)
            );
      if (typeFiltered.length <= 0) {
        typeFiltered = copyTwo;
        alert("There are no pokemon of the indicated type");
      }
      return {
        ...state,
        pokemons: typeFiltered,
      };
    case GET_ALL_TYPES:
      return {
        ...state,
        types: action.payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
