import { StyleSheet, css } from "aphrodite";

import { SideInfo } from "../components/SideInfo";
import { TopInfo } from "../components/TopInfo";
import { Projects } from "../components/Projects";
import { ToggleLang } from "../components/ToggleLang";

import { roboto } from "../fonts/fonts";

const styles = StyleSheet.create({
  kengru: {
    display: "flex",
    height: "100%",
    backgroundColor: "#FEFEFE",
    fontFamily: roboto.n400,
    "@media (max-width: 1110px)": {
      flexDirection: "column"
    }
  }
});

function App() {
  return (
    <div className={css(styles.kengru)}>
      <ToggleLang />
      <SideInfo />
      <TopInfo />
      <Projects />
    </div>
  );
}

export { App };
