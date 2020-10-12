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
    flexGrow: 1,
    transition: "opacity 250ms ease-in"
  },
  fadeEnter: {
    opacity: 0,
    transform: "scale(0.9)"
  },
  fadeEnterActive: {
    opacity: 1,
    transform: "translateX(0)",
    transition: "opacity 300ms, transform 300ms"
  },
  fadeExit: {
    opacity: 1,
    transition: "opacity 250ms ease-in"
  },
  fadeExitActive: {
    opacity: 0,
    transform: "scale(0.9)",
    transition: "opacity 300ms, transform 300ms"
  }
});

const fade = {
  enter: css(styles.fadeEnter),
  enterActive: css(styles.fadeEnterActive),
  exit: css(styles.fadeExit),
  exitActive: css(styles.fadeExitActive)
};

function App() {
  let location = useLocation();

  return (
    <div className={css(styles.kengru)}>
      <SideInfo />
      <TransitionGroup className={css(styles.transitionGroup)}>
        <CSSTransition
          key={location.key}
          classNames={{
            enter: fade.enter,
            enterActive: fade.enterActive,
            exit: fade.exit,
            exitActive: fade.exitActive
          }}
          timeout={200}
        >
          <Switch location={location}>
            <Route exact path="/">
              <Work />
            </Route>
            <Route path="/projects">
              <Projects />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export { App };
