import * as types from "./aTypes";
import axios from "../../axiosInstance/axiosInstance";

export const fetchSingleSketch = sketch => {
  return {
    type: types.FETCH_SINGLE_SKETCH,
    sketch: sketch
  };
};

export const fetchMenuSuccess = menuData => {
  return {
    type: types.FETCH_MENU_SUCCESS,
    items: menuData
  };
};

// Fetching the current sketch information asynchronously.
export const fetchSketchAsync = id => {
  const request = `/sketchs/${id}.json`;
  return dispatch => {
    axios
      .get(request)
      .then(response => {
        dispatch(fetchSingleSketch(response.data));
      })
      .catch(error => {});
  };
};

// Fetching the current menu items with their routes asynchronously.
export const fetchMenuAsync = () => {
  const request = `/menu/challenges.json`;
  return dispatch => {
    axios
      .get(request)
      .then(response => {
        dispatch(fetchMenuSuccess(response.data));
      })
      .catch(error => {});
  };
};
