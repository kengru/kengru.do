import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite/no-important";

import { SkillBar } from "./SkillBar";
import { roboto } from "../../fonts/fonts";
import { odin } from "../../utils/axios";

const styles = StyleSheet.create({
  main: {
    display: "flex",
    height: "100%",
    flex: 6,
    margin: "0em 2em 0em 1em",
    justifyContent: "center",
    alignContent: "center",
    fontSize: "calc(3px + 2vmin)",
    textAlign: "center",
    "@media (max-width: 1110px)": {
      flexDirection: "column",
      margin: 0
    }
  },
  sections: {
    display: "flex",
    width: "50%",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    "@media (max-width: 1110px)": {
      width: "100%"
    }
  },
  title: {
    color: "#2d2d2d",
    fontSize: "30px",
    width: "100%",
    fontFamily: roboto.i500,
    marginBottom: "1.2em",
    "@media (max-width: 500px)": {
      fontSize: "24px"
    }
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    margin: "1em",
    padding: "1.5em",
    width: "60%",
    alignSelf: "center",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: "14px",
    zIndex: 2,
    boxShadow: "0px 0px 8px 0px rgba(0,0,0,0.10)",
    transition: "transform 0.1s linear",
    ":hover": {
      transform: "scale(1.03, 1.03)"
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
        <div className={css(styles.card)}>
          <span className={css(styles.title)}>Front-end</span>
          {items
            ? items
                .filter((item) => item.stack === Stack.FrontEnd)
                .map((item) => (
                  <SkillBar
                    key={item.name}
                    label={item.name}
                    completedPCT={item.pct}
                  />
                ))
            : null}
        </div>
      </div>
      <div className={css(styles.sections)}>
        <div className={css(styles.card)}>
          <span className={css(styles.title)}>Back-end</span>
          {items
            ? items
                .filter((item) => item.stack === Stack.BackEnd)
                .map((item) => (
                  <SkillBar
                    key={item.name}
                    label={item.name}
                    completedPCT={item.pct}
                  />
                ))
            : null}
        </div>
      </div>
    </div>
  );
};
