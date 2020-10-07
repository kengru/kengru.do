import React from "react";
import { StyleSheet, css } from "aphrodite";

import { rales } from "../../fonts/fonts";

const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "16em",
    margin: "1em",
    boxShadow: "0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1)"
  },
  cardImage: {
    display: "block",
    position: "relative",
    boxSizing: "inherit"
  },
  image: {
    display: "block",
    position: "relative",
    margin: 0,
    padding: 0,
    marginBlockStart: "1em",
    marginBlockEnd: "1em",
    marginInlineStart: "40px",
    marginInlineEnd: "40px"
  },
  hasRatio: {
    display: "block",
    height: "auto",
    width: "100%",
    maxWidth: "100%"
  },
  content: {
    padding: "1.4rem",
    backgroundColor: "initial"
  },
  header: {
    display: "flex",
    alignItems: "stretch",
    boxShadow: "0 1px 2px rgba(10,10,10,.1)"
  },
  headerTitle: {
    display: "flex",
    flexDirection: "column",
    padding: "0.70rem",
    wordWrap: "normal",
    fontSize: "1.4rem",
    fontFamily: rales.n600
  },
  headerWork: {
    fontSize: "1.2rem",
    fontFamily: rales.n400
  },
  skills: {
    display: "block",
    textAlign: "center",
    alignItems: "stretch",
    borderTop: "1px solid #DBDBDB"
  },
  tag: {
    display: "inline-grid",
    height: "2em",
    color: "#4A4A4A",
    fontSize: "0.75rem",
    padding: "0em 0.75em 0em 0.75em",
    justifyContent: "center",
    whiteSpace: "nowrap",
    lineHeight: 1,
    backgroundColor: "#F5F5F5"
  },
  footer: {
    display: "flex",
    padding: "0.6rem",
    alignItems: "stretch",
    fontSize: "1rem",
    fontFamily: rales.n400,
    borderTop: "1px solid #DBDBDB"
  }
});

export const ProjectItem = () => {
  return (
    <div className={css(styles.main)}>
      <div className={css(styles.header)}>
        <div className={css(styles.headerTitle)}>
          Frontend Developer
          <div className={css(styles.headerWork)}>Soshace</div>
        </div>
      </div>
      <div className={css(styles.skills)}>
        <span className={css(styles.tag)}>React.js</span>
        <span className={css(styles.tag)}>Typescript</span>
        <span className={css(styles.tag)}>Redux</span>
        <span className={css(styles.tag)}>Docker</span>
        <span className={css(styles.tag)}>Enzyme</span>
      </div>
      <div className={css(styles.footer)}>May 2019 - January 2020</div>
    </div>
  );
};
