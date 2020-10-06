import React from "react";
import { StyleSheet, css } from "aphrodite/no-important";

import { WorkItem } from "./WorkItemV2";

const styles = StyleSheet.create({
  work: {
    display: "flex",
    height: "100%",
    width: "100%",
    margin: "0em 2em 0em 1em",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    fontSize: "calc(3px + 2vmin)"
  }
});

function Work() {
  return (
    <div className={css(styles.work)}>
      <WorkItem />
      <WorkItem />
      <WorkItem />
      <WorkItem />
    </div>
  );
}

export { Work };
