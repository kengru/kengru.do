import * as types from "./aTypes";

export const fetchMenuSuccess = () => {
  return {
    type: types.FETCH_MENU_SUCCESS
  };
};

export const clearMenuItems = () => {
  return {
    type: types.CLEAR_MENU_ITEMS
  };
};