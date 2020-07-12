import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { StyleSheet, css } from "aphrodite";

import { SideInfo } from "../components/SideInfo";
import { Work } from "../components/work/Work";
import { rales } from "../fonts/fonts";

const styles = StyleSheet.create({
  kengru: {
    // backgroundColor: "#572555",
    // backgroundColor: "#1F141E"
    // backgroundColor: "#212021",
    display: "flex",
    height: "100%",
    backgroundColor: "#F5F5F5",
    fontFamily: rales.n400
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
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames={{ enter: fade.enter, enterActive: fade.enterActive }}
          timeout={300}
        >
          <Switch>
            <Route path="/work">
              <Work />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export { App };
