import React, { Component } from "react";
import routes from "./routes";
import RouteWithSubs from "../../../helpers/routeWithSubs";

class P5Container extends Component {
  render() {
    return (
      <div>
        {routes.map((route, i) => (
          <RouteWithSubs key={i} {...route} />
        ))}
      </div>
    );
  }
}

export default P5Container;
