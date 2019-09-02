import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Column, Title, Content, Hero } from "rbx";

import RouteWithSubs from "../../helpers/routeWithSubs";
import routes from "../../components/GamesComponents/routes";
import GameMenu from "../../components/GamesComponents/GamesMenu/GamesMenu";

class Games extends Component {
  render() {
    return (
      <Hero.Body>
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
