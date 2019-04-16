import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Column, Title, Content, Hero } from "rbx";
import "rbx/index.css";

import routes from "./routes";
import RouteWithSubs from "../../helpers/routeWithSubs";
import ChallengeHome from "./ChallengeHome/ChallengeHome";
import ChallengeMenu from "./ChallengeMenu/ChallengeMenu";

class Challenges extends Component {
  render() {
    return (
      <Column.Group>
        <Column size="one-quarter">
          <ChallengeMenu />
        </Column>
        <Column>
          <Route exact path="/challenges" component={ChallengeHome} />
          {routes.map((route, i) => (
            <RouteWithSubs key={i} {...route} />
          ))}
        </Column>
      </Column.Group>
    );
  }
}

export default Challenges;
