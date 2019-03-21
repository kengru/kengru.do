/*
  Updates the store state of the items that go in the Bio section.
*/

import * as types from "../actions/aTypes";

const initialState = {
  personal: [],
  work: [],
  education: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PI_ITEMS:
      return {
        ...state,
        personal: action.personal
      };
    case types.FETCH_WE_ITEMS:
      return {
        ...state,
        work: action.work
      };
    case types.FETCH_ED_ITEMS:
      return {
        ...state,
        education: action.education
      };
    default:
      break;
  }
  return state;
};

export default reducer;
