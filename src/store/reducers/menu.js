import * as type from "../actions/aTypes";

const initialState = {
  menuItems: []
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
    default:
      break;
  }

  return state;
};

export default reducer;
