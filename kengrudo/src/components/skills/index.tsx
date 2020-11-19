import React from "react";
import { StyleSheet, css } from "aphrodite/no-important";

import { SkillBar, Colors } from "./SkillBar";

const styles = StyleSheet.create({
  main: {
    display: "flex",
    height: "100%",
    width: "100%",
    margin: "0em 2em 0em 1em",
    justifyContent: "center",
    alignContent: "center",
    fontSize: "calc(3px + 2vmin)",
    textAlign: "center"
  },
  sections: {
    display: "flex",
    width: "50%",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center"
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    margin: "2em",
    padding: "1em",
    height: "200px",
    width: "70%",
    alignSelf: "center",
    border: "1px solid rgba(0,0,0,0.3)",
    borderRadius: "14px",
    transition: "transform 0.2s linear",
    ":hover": {
      transform: "scale(1.05, 1.05)"
    }
  }
});

export const Skills = () => {
  return (
    <div className={css(styles.main)}>
      <div className={css(styles.sections)}>
        <h4>Front-end</h4>
        <div className={css(styles.card)}>
          <SkillBar label={"React"} completedPCT={90} color={Colors.blue} />
          <SkillBar label={"Redux"} completedPCT={75} color={Colors.blue} />
        </div>
      </div>
      <div className={css(styles.sections)}>
        <h4>Back-end</h4>
        <div className={css(styles.card)}>
          <SkillBar label={"Node"} completedPCT={80} color={Colors.blue} />
          <SkillBar label={"MongoDB"} completedPCT={80} color={Colors.blue} />
          <SkillBar
            label={"Typescript"}
            completedPCT={90}
            color={Colors.blue}
          />
        </div>
      </div>
    </div>
  );
};
