import * as type from "../actions/aTypes";

const initialState = {
  menuItems: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_MENU_SUCCESS:
      return {
        ...state,
        menuItems: [
          {
            text: "are u oki",
            link: "x"
          }
        ]
      }
  
    default:
      break;
  }
}

export default reducer;