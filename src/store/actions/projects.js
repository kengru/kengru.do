import * as types from "./aTypes";
import axios from "../../axiosInstance/axiosInstance";

export const fetchProjects = projects => {
  return {
    type: types.FETCH_PROJECTS,
    projects: projects
  };
};

export const selectProject = project => {
  return {
    type: types.SELECT_PROJECT,
    selectedProject: project
  };
};

export const fetchProjectsAsync = () => {
  const request = `/projects.json`;
  return dispatch => {
    axios
      .get(request)
      .then(response => {
        console.log(response);
        dispatch(fetchProjects(response.data));
      })
      .catch(error => {});
  };
};
