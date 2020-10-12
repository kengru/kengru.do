import React from "react";
import { StyleSheet, css } from "aphrodite/no-important";

import { ProjectItem } from "./ProjectItem";

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
  projectItems: {
    display: "flex",
    margin: "auto",
    height: "80%",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center"
  }
});

export const Projects = () => {
  return (
    <div className={css(styles.main)}>
      <div className={css(styles.projectItems)}>
        <ProjectItem />
        <ProjectItem />
      </div>
    </div>
  );
};
