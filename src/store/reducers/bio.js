/*
  Updates the store state of the items that go in the Bio section.
*/

import * as types from "../actions/aTypes";

const initialState = {
  work: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_WE_ITEMS:
      return {
        ...state,
        work: action.work
      };
    default:
      break;
  }
  return state;
};

export default reducer;
