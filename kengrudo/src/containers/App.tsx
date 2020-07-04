import React from "react";
import { StyleSheet, css } from "aphrodite";

import { SideInfo } from "../components/SideInfo";

const styles = StyleSheet.create({
  kengru: {
    // backgroundColor: "#572555",
    // backgroundColor: "#1F141E"
    // backgroundColor: "#212021",
    backgroundColor: "#F5F5F5",
    minHeight: "100vh",
    fontFamily: "rale-n400"
  }
});

function App() {
  return (
    <div className={css(styles.kengru)}>
      <SideInfo />
    </div>
  );
}

export { App };
