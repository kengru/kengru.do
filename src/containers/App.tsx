import { StyleSheet, css } from "aphrodite";

import { SideInfo } from "../components/SideInfo";
import { TopInfo } from "../components/TopInfo";
import { Projects } from "../components/projects";

import { roboto } from "../fonts/fonts";

const styles = StyleSheet.create({
  kengru: {
    // backgroundColor: "#572555",
    // backgroundColor: "#1F141E",
    // backgroundColor: "#212021",
    display: "flex",
    height: "100%",
    backgroundColor: "#FEFEFE",
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

function App() {
  return (
    <div className={css(styles.kengru)}>
      <SideInfo />
      <TopInfo />
      <Projects />
    </div>
  );
}

export { App };
