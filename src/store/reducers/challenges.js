/*
  Updates the store state of the sketch presented in the screen at the moment.
*/

import * as types from "../actions/aTypes";

const initialState = {
  menuItems: [],
  sketch: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SINGLE_SKETCH:
      return {
        ...state,
        sketch: action.sketch
      };
    case types.FETCH_MENU_SUCCESS:
      return {
        ...state,
        menuItems: action.items
      };
    default:
      break;
  }
  return state;
};

export default reducer;
