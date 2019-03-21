import * as types from "./aTypes";
import axios from "../../axiosInstance/axiosInstance";

export const fetchPersonalItems = pi => {
  return {
    type: types.FETCH_PI_ITEMS,
    personal: pi
  };
};

export const fetchWorkItems = wi => {
  return {
    type: types.FETCH_WE_ITEMS,
    work: wi
  };
};

export const fetchEducationItems = ei => {
  return {
    type: types.FETCH_ED_ITEMS,
    education: ei
  };
};

// Fetching the current sketch information asynchronously.
export const fetchPersonalAsync = () => {
  const request = `/bio/pi.json`;
  return dispatch => {
    axios
      .get(request)
      .then(response => {
        dispatch(fetchPersonalItems(response.data));
      })
      .catch(error => {});
  };
};

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

export const fetchEducationAsync = () => {
  const request = `/bio/ed.json`;
  return dispatch => {
    axios
      .get(request)
      .then(response => {
        dispatch(fetchEducationItems(response.data));
      })
      .catch(error => {});
  };
};
