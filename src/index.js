import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import * as serviceWorker from "./serviceWorker";
import App from "./containers/App/App";

import bioReducer from "./store/reducers/bio";
import projectsReducer from "./store/reducers/projects";
import gamesReducer from "./store/reducers/games";
import challengesReducer from "./store/reducers/challenges";
import natureReducer from "./store/reducers/nature";

import "./index.css";

const reducers = combineReducers({
  bio: bioReducer,
  projects: projectsReducer,
  games: gamesReducer,
  challenges: challengesReducer,
  nature: natureReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// ReactDOM.render(app, document.getElementById("root"));
ReactDOM.render(app, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
