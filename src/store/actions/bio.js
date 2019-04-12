import * as types from "./aTypes";
import axios from "../../axiosInstance/axiosInstance";

export const fetchWorkItems = wi => {
  return {
    type: types.FETCH_WE_ITEMS,
    work: wi
  };
};

// Fetching the current work items information asynchronously.
export const fetchWorkAsync = () => {
  const request = `/bio/we.json`;
  return dispatch => {
    axios
      .get(request)
      .then(response => {
        dispatch(fetchWorkItems(response.data));
      })
      .catch(error => {});
  };
};
