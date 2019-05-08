/*
  Updates the store state of the nature component.
*/

import * as types from "../actions/aTypes";

const initialState = {
  menuItems: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_MENU_NATURE:
      return {
        ...state,
        menuItems: action.menuItems
      };
    default:
      break;
  }
  return state;
};

export default reducer;
