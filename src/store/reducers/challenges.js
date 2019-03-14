/*
  Updates the store state of the sketch presented in the screen at the moment.
*/

import * as types from "../actions/aTypes";

const initialState = {
  sketch: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SINGLE_SKETCH:
      return {
        ...state,
        sketch: action.sketch
      };
    default:
      break;
  }
  return state;
};

export default reducer;
