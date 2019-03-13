import * as types from "./aTypes";
import axios from "../../axiosInstance/axiosInstance";

export const fetchSingleSketch = sketch => {
  return {
    type: types.FETCH_SINGLE_SKETCH,
    sketch: sketch
  };
};

export const fetchSketchAsync = id => {
  const request = `/sketchs/${id}.json`;
  console.log("[fetching sketch: ]", id);
  return dispatch => {
    axios
      .get(request)
      .then(response => {
        dispatch(fetchSingleSketch(response.data));
      })
      .catch(error => {});
  };
};
