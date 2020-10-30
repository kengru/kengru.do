import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { StyleSheet, css } from "aphrodite";

import { SideInfo } from "../components/SideInfo";
import { Work } from "../components/work";
import { Projects } from "../components/projects";
import { roboto } from "../fonts/fonts";

const styles = StyleSheet.create({
  kengru: {
    // backgroundColor: "#572555",
    // backgroundColor: "#1F141E"
    // backgroundColor: "#212021",
    display: "flex",
    height: "100%",
    backgroundColor: "#F9F9F9",
    fontFamily: roboto.n400
  },
  transitionGroup: {
    display: "flex",
    flexGrow: 1
  },
  fadeEnter: {
    opacity: 0
  },
  fadeEnterActive: {
    opacity: 1,
    transition: "opacity 200ms"
  },
  fadeExit: {
    opacity: 1
  },
  fadeExitActive: {
    opacity: 0,
    transition: "opacity 200ms"
  }
});

const fade = {
  enter: css(styles.fadeEnter),
  enterActive: css(styles.fadeEnterActive),
  exit: css(styles.fadeExit),
  exitActive: css(styles.fadeExitActive)
};

const routes = [
  {
    path: "/",
    Component: Work
  },
  {
    path: "/projects",
    Component: Projects
  }
];

function App() {
  return (
    <div className={css(styles.kengru)}>
      <SideInfo />
      {routes.map(({ path, Component }) => (
        <Route key={path} exact path={path}>
          {({ match }) => (
            <CSSTransition
              in={match != null}
              classNames={{
                enter: fade.enter,
                enterActive: fade.enterActive,
                exit: fade.exit,
                exitActive: fade.exitActive
              }}
              timeout={300}
            >
              <Component />
            </CSSTransition>
          )}
        </Route>
      ))}
    </div>
  );
}

export { App };
