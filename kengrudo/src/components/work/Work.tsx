import React from "react";
import { StyleSheet, css } from "aphrodite/no-important";

import { WorkItem } from "./WorkItem";
import { rales } from "../../fonts/fonts";

const styles = StyleSheet.create({
  work: {
    display: "flex",
    height: "100%",
    width: "100%",
    margin: "0em 2em 0em 2em",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    fontSize: "calc(3px + 2vmin)"
  },
  logo: {
    alignSelf: "flex-start"
  },
  name: {
    paddingTop: "0.2em",
    fontSize: rales.i500
  },
  text: {
    fontSize: "calc(9px + 1vmin)"
  }
});

function Work() {
  return (
    <div className={css(styles.work)}>
      <WorkItem />
    </div>
  );
}

export { Work };
