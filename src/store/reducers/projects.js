/*
  Updates the store state of the projects.
*/

import * as types from "../actions/aTypes";

const initialState = {
  projects: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PROJECTS:
      return {
        ...state,
        projects: action.projects
      };
    default:
      break;
  }
  return state;
};

export default reducer;
