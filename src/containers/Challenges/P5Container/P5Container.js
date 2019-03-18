import React, { Component } from "react";
import routes from "./routes";
import { Route } from "react-router-dom";
import RouteWithSubs from "../../../helpers/routeWithSubs";
import ChallengeHome from "./ChallengeHome/ChallengeHome";

class P5Container extends Component {
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

export default P5Container;
