import React from "react";
import { StyleSheet, css } from "aphrodite/no-important";

import { WorkItem } from "./WorkItem";

const styles = StyleSheet.create({
  main: {
    display: "flex",
    height: "100%",
    width: "100%",
    margin: "0em 2em 0em 1em",
    justifyContent: "center",
    alignContent: "center",
    fontSize: "calc(3px + 2vmin)"
  },
  bio: {
    width: "30%",
    margin: "auto",
    placeContent: "center",
    fontSize: "calc(2px + 2vmin)"
  },
  points: {
    listStyle: "none",
    marginLeft: 0,
    paddingLeft: "1em",
    textIndent: "-1em"
  },
  singlePoint: {
    margin: "0.8rem 0rem 0.8rem 0rem"
  },
  workItems: {
    margin: "auto",
    justifyContent: "center",
    alignContent: "center"
  }
});

export const Bio = () => {
  return (
    <div className={css(styles.main)}>
      <div className={css(styles.bio)}>
        <ul className={css(styles.points)}>
          <li className={css(styles.singlePoint)}>» Frontend Development</li>
          <li className={css(styles.singlePoint)}>» 3D Modeling</li>
          <li className={css(styles.singlePoint)}>» Video Games</li>
        </ul>
      </div>
      <div className={css(styles.workItems)}>
        <WorkItem highlighted />
        <WorkItem highlighted={false} />
        <WorkItem highlighted={false} />
        <WorkItem highlighted={false} />
      </div>
    </div>
  );
};
