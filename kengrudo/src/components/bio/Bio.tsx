import React from "react";
import { StyleSheet, css } from "aphrodite/no-important";

import { WorkItem } from "./WorkItem";

const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    margin: "0em 2em 0em 1em",
    justifyContent: "center",
    alignContent: "center",
    fontSize: "calc(3px + 2vmin)"
  },
  present: {
    display: "flex",
    marginTop: "2em",
    alignContent: "center",
    justifyContent: "center"
  },
  workItems: {
    display: "flex",
    margin: "auto",
    height: "70%",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center"
  }
});

export const Bio = () => {
  return (
    <div className={css(styles.main)}>
      <div className={css(styles.present)}>
        <WorkItem highlighted />
      </div>
      <div className={css(styles.workItems)}>
        <WorkItem highlighted={false} />
        <WorkItem highlighted={false} />
        <WorkItem highlighted={false} />
      </div>
    </div>
  );
};
