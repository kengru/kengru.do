import { Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { StyleSheet, css } from "aphrodite";

import { SideInfo } from "../components/SideInfo";
import { TopInfo } from "../components/TopInfo";
import { Jobs } from "../components/jobs";
import { Projects } from "../components/projects";
import { Skills } from "../components/skills";

import { roboto } from "../fonts/fonts";

const styles = StyleSheet.create({
  kengru: {
    // backgroundColor: "#572555",
    // backgroundColor: "#1F141E"
    // backgroundColor: "#212021",
    display: "flex",
    height: "100%",
    backgroundColor: "#F9F9F9",
    fontFamily: roboto.n400,
    "@media (max-width: 1110px)": {
      flexDirection: "column"
    }
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
    transition: "opacity 700ms"
  },
  fadeExit: {
    opacity: 1
  },
  fadeExitActive: {
    display: "none",
    transition: "opacity 300ms"
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
    Component: Jobs
  },
  {
    path: "/projects",
    Component: Projects
  },
  {
    path: "/skills",
    Component: Skills
  }
];

function App() {
  return (
    <div className={css(styles.kengru)}>
      <SideInfo />
      <TopInfo />
      {routes.map(({ path, Component }) => (
        <Route key={path} exact path={path}>
          {({ match }) => (
            <CSSTransition
              in={match != null}
              classNames={fade}
              timeout={700}
              unmountOnExit
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
