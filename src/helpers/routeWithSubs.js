/*
  Description:
    Generates routes with subroutes from a route config file.
  Props:
    route: route item with path, and other routes inside.
*/

import React from "react";
import { Route } from "react-router-dom";

const routeWithSubs = route => {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
};

export default routeWithSubs;