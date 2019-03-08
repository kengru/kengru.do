import * as type from "../actions/aTypes";

const initialState = {
  menuItems: [],
  path: "",
  inChallenges: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case type.CLEAR_MENU_ITEMS:
      return {
        ...state,
        menuItems: []
      };
    case type.FETCH_MENU_SUCCESS:
      return {
        ...state,
        menuItems: action.items
      };
    case type.SET_PATH_PROP:
      return {
        ...state,
        path: action.path
      };
    case type.SET_IN_CHALLENGES:
      return {
        ...state,
        inChallenges: action.challenges
      };
    default:
      break;
  }

  return state;
};

export default reducer;
