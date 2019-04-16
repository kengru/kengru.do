import React, { Component } from "react";
import { Route } from "react-router-dom";
import routes from "./routes";
import RouteWithSubs from "../../helpers/routeWithSubs";
import ChallengeHome from "./ChallengeHome/ChallengeHome";

class Challenges extends Component {
  render() {
    return (
      <div>
        <Route exact path="/challenges" component={ChallengeHome} />
        {routes.map((route, i) => (
          <RouteWithSubs key={i} {...route} />
        ))}
      </div>
    );
  }
}

export default Challenges;
