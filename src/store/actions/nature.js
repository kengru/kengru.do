import * as types from "./aTypes";
import axios from "../../axiosInstance/axiosInstance";

export const fetchMenu = menuData => {
  return {
    type: types.FETCH_MENU_NATURE,
    menuItems: menuData
  };
};

// Fetching the current menu items with their routes asynchronously.
export const fetchMenuNatureAsync = () => {
  const request = `/menu/nature.json`;
  return dispatch => {
    axios
      .get(request)
      .then(response => {
        dispatch(fetchMenu(response.data));
      })
      .catch(error => {});
  };
};
