import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { StyleSheet, css } from "aphrodite";

import { SideInfo } from "../components/SideInfo";
import { Bio } from "../components/bio/Bio";
import { rales } from "../fonts/fonts";

const styles = StyleSheet.create({
  kengru: {
    // backgroundColor: "#572555",
    // backgroundColor: "#1F141E"
    // backgroundColor: "#212021",
    display: "flex",
    height: "100%",
    backgroundColor: "#F9F9F9",
    fontFamily: rales.n400
  },
  transitionGroup: {
    display: "flex",
    flexGrow: 1
  },
  fadeEnter: {
    opacity: 0,
    zIndex: 1
  },
  fadeEnterActive: {
    opacity: 1,
    transition: "opacity 250ms ease-in"
  }
});

const fade = {
  enter: css(styles.fadeEnter),
  enterActive: css(styles.fadeEnterActive)
};

function App() {
  let location = useLocation();

  return (
    <div className={css(styles.kengru)}>
      <SideInfo />
      <TransitionGroup className={css(styles.transitionGroup)}>
        <CSSTransition
          key={location.key}
          classNames={{ enter: fade.enter, enterActive: fade.enterActive }}
          timeout={300}
        >
          <Switch>
            <Route exact path="/">
              <Bio />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export { App };