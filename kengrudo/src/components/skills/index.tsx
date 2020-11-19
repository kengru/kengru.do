import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite/no-important";

import { SkillBar } from "./SkillBar";
import { roboto } from "../../fonts/fonts";
import { odin } from "../../utils/axios";

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
  title: {
    color: "#2d2d2d",
    fontSize: "30px",
    fontFamily: roboto.n500
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    margin: "1em",
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

enum Stack {
  FrontEnd = 0,
  BackEnd = 1
}

interface Item {
  name: string;
  pct: number;
  stack: Stack;
}

export const Skills = () => {
  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      const skillItems = await odin.get(`/kengru/skills`);
      setItems(skillItems.data.data as Item[]);
    };

    fetchItems();
  }, []);

  return (
    <div className={css(styles.main)}>
      <div className={css(styles.sections)}>
        <span className={css(styles.title)}>Front-end</span>
        <div className={css(styles.card)}>
          {items
            ? items
                .filter((item) => item.stack === Stack.FrontEnd)
                .map((item) => (
                  <SkillBar
                    label={item.name}
                    completedPCT={item.pct}
                  />
                ))
            : null}
          <SkillBar label={"React"} completedPCT={90} />
          <SkillBar label={"Redux"} completedPCT={75} />
        </div>
      </div>
      <div className={css(styles.sections)}>
        <span className={css(styles.title)}>Back-end</span>
        <div className={css(styles.card)}>
          {items
            ? items
                .filter((item) => item.stack === Stack.BackEnd)
                .map((item) => (
                  <SkillBar
                    label={item.name}
                    completedPCT={item.pct}
                  />
                ))
            : null}
          <SkillBar label={"Node"} completedPCT={80} />
          <SkillBar label={"MongoDB"} completedPCT={80} />
          <SkillBar label={"Typescript"} completedPCT={90} />
        </div>
      </div>
    </div>
  );
};
