/*
  Updates the store state of the nature component.
*/

import * as types from "../actions/aTypes";

const initialState = {
  games: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_GAMES:
      return {
        ...state,
        games: action.games
      };
    default:
      break;
  }
  return state;
};

export default reducer;
