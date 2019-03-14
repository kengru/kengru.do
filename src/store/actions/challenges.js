import * as types from "./aTypes";
import axios from "../../axiosInstance/axiosInstance";

export const fetchSingleSketch = sketch => {
  return {
    type: types.FETCH_SINGLE_SKETCH,
    sketch: sketch
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
