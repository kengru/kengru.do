import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Hero } from "rbx";

import GameMenu from "../../components/GamesComponents/GamesMenu/GamesMenu";

import RouteWithSubs from "../../helpers/routeWithSubs";
import routes from "../../components/GamesComponents/routes";

import "./Games.css"

class Games extends Component {
  render() {
    return (
      <Hero.Body className="gameBody">
        <Switch>
          <Route exact path="/games" component={GameMenu} />
          {routes.map((route, i) => (
            <RouteWithSubs key={i} {...route} />
          ))}
        </Switch>
      </Hero.Body>
    );
  }
}

export default Games;
