import React from "react";
import { StyleSheet, css } from "aphrodite";

import { roboto } from "../../fonts/fonts";

const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "12em",
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
    padding: 0
  },
  hasRatio: {
    display: "block",
    height: "auto",
    width: "100%",
    maxWidth: "100%"
  },
  content: {
    padding: "0em 1em 1em 1em",
    backgroundColor: "initial"
  },
  contentTitle: {
    display: "flex",
    marginTop: "1rem",
    marginBottom: "1rem",
    textAlign: "left",
    alignItems: "flex-start"
  },
  contentTitleText: {
    fontSize: "1.4rem",
    lineHeight: "1.125",
    fontFamily: roboto.n500,
    wordBreak: "break-word"
  },
  contentBody: {
    textAlign: "center",
    fontSize: "1rem"
  },
  skills: {
    display: "block",
    textAlign: "center",
    alignItems: "stretch",
    borderTop: "1px solid #DBDBDB"
  },
  tag: {
    display: "inline-grid",
    height: "1.5em",
    color: "#4A4A4A",
    fontSize: "0.6rem",
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
    fontFamily: roboto.n400,
    borderTop: "1px solid #DBDBDB"
  },
  footerItem: {
    display: "flex",
    flexBasis: 0,
    flexGrow: 1,
    flexShrink: 0,
    padding: "0.75rem",
    color: "#3273DC",
    cursor: "pointer",
    textDecoration: "none",
    justifyContent: "center"
  }
});

export const ProjectItem = () => {
  return (
    <div className={css(styles.main)}>
      <div className={css(styles.cardImage)}>
        <figure className={css(styles.image)}>
          <img
            className={css(styles.hasRatio)}
            src="https://via.placeholder.com/250"
            alt="Giru"
          />
        </figure>
      </div>
      <div className={css(styles.content)}>
        <div className={css(styles.contentTitle)}>
          <span className={css(styles.contentTitleText)}>Giru</span>
        </div>
        <div className={css(styles.contentBody)}>
          A telegram bot, designed to be used by my friends.
        </div>
      </div>
      <div className={css(styles.footer)}>
        <a className={css(styles.footerItem)} href="/#">
          Source code
        </a>
      </div>
      <div className={css(styles.skills)}>
        <span className={css(styles.tag)}>React.js</span>
        <span className={css(styles.tag)}>Typescript</span>
        <span className={css(styles.tag)}>Redux</span>
        <span className={css(styles.tag)}>Docker</span>
        <span className={css(styles.tag)}>Enzyme</span>
      </div>
    </div>
  );
};
