import React from "react";
import moment from "moment";
import { StyleSheet, css } from "aphrodite/no-important";

import { roboto } from "../../fonts/fonts";

const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "25%",
    height: "140px",
    margin: "1em",
    boxShadow: "0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1)",
    transition: "transform 0.2s linear, height 0.2s linear",
    ":hover": {
      transform: "scale(1.05, 1.05)"
    },
    "@media (max-width: 820px)": {
      height: "150px"
    },
    "@media (max-width: 550px)": {
      height: "215px"
    }
  },
  highlight: {
    boxShadow: "0 2px 3px rgba(10,40,10,.2), 0 0 0 1px rgba(10,40,10,.2)"
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
    fontSize: "calc(10px + 1vmin)",
    fontFamily: roboto.n700,
    "@media (max-width: 1450px)": {
      fontSize: "0.9rem"
    }
  },
  headerWork: {
    color: "#4d4d4d",
    fontSize: "calc(8px + 1vmin)",
    fontFamily: roboto.n400,
    "@media (max-width: 1450px)": {
      fontSize: "0.7rem"
    }
  },
  skills: {
    display: "block",
    height: "100%",
    textAlign: "center",
    alignItems: "stretch",
    borderTop: "1px solid #DBDBDB"
  },
  skillContainer: {
    display: "flex",
    height: "100%",
    placeContent: "center",
    flexWrap: "wrap",
    padding: "0em 0.2em 0em 0.2em"
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
    backgroundColor: "#F5F5F5",
    "@media (max-width: 1450px)": {
      fontSize: "0.6rem"
    }
  },
  footer: {
    display: "flex",
    padding: "0.6rem",
    color: "#1d1d1d",
    alignItems: "stretch",
    fontSize: "1rem",
    fontFamily: roboto.n400,
    borderTop: "1px solid #DBDBDB",
    "@media (max-width: 1450px)": {
      fontSize: "0.8rem"
    }
  }
});

type Props = {
  title: string;
  placeOfWork: string;
  skills: string[];
  from: Date;
  to: Date;
  highlighted: boolean;
};

export const WorkItem = (props: Props) => {
  const { title, placeOfWork, from, to, skills, highlighted } = props;

  return (
    <div className={css(styles.main, highlighted ? styles.highlight : null)}>
      <div className={css(styles.header)}>
        <div className={css(styles.headerTitle)}>
          {title}
          <div className={css(styles.headerWork)}>{placeOfWork}</div>
        </div>
      </div>
      <div className={css(styles.footer)}>{`${moment(from).format(
        "MMM YYYY"
      )} - ${
        moment() < moment(to) ? "present" : moment(to).format("MMM YYYY")
      }`}</div>
      <div className={css(styles.skills)}>
        <div className={css(styles.skillContainer)}>
          {skills.map((skill) => (
            <span key={skill} className={css(styles.tag)}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
