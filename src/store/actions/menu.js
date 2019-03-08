import * as types from "./aTypes";
import axios from "../../axiosInstance/axiosInstance";

export const fetchMenuSuccess = menuData => {
  return {
    type: types.FETCH_MENU_SUCCESS,
    items: menuData
  };
};

export const clearMenuItems = () => {
  return {
    type: types.CLEAR_MENU_ITEMS
  };
};

export const setPathProp = path => {
  return {
    type: types.SET_PATH_PROP,
    path: path
  };
};

export const fetchMenuAsync = menu => {
  const request = `/menu/${menu}.json`;
  return dispatch => {
    axios
      .get(request)
      .then(response => {
        dispatch(fetchMenuSuccess(response.data));
      })
      .catch(error => {});
  };
};
