import * as types from "./aTypes";
import axios from "../../axiosInstance/axiosInstance";

export const fetchProjects = projects => {
  return {
    type: types.FETCH_PROJECTS,
    projects: projects
  };
};

// Fetching the projects I've made asynchronously, thanks to thunk.
export const fetchProjectsAsync = () => {
  const request = `/projects.json`;
  return dispatch => {
    axios
      .get(request)
      .then(response => {
        dispatch(fetchProjects(response.data));
      })
      .catch(error => {});
  };
};
