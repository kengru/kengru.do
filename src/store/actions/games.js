import * as types from "./aTypes";
import axios from "../../axiosInstance/axiosInstance";

export const fetchGames = games => {
  return {
    type: types.FETCH_GAMES,
    games: games
  };
};

// Fetching the current menu items with their routes asynchronously.
export const fetchGamesAsync = () => {
  const request = `/games.json`;
  return dispatch => {
    axios
      .get(request)
      .then(response => {
        dispatch(fetchGames(response.data));
      })
      .catch(error => {});
  };
};
