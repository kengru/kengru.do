/*
  Updates the store state of the projects.
*/

import * as types from "../actions/aTypes";

const initialState = {
  projects: [],
  selectedProject: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PROJECTS:
      return {
        ...state,
        projects: action.projects
      };
    case types.SELECT_PROJECT:
      return {
        ...state,
        selectedProject: action.selectedProject
      };
    default:
      break;
  }
  return state;
};

export default reducer;
