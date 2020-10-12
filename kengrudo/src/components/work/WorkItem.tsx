import React from "react";
import moment from "moment";
import { StyleSheet, css } from "aphrodite/no-important";

import { roboto } from "../../fonts/fonts";

const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "16em",
    margin: "1em",
    boxShadow: "0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1)"
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
    fontSize: "1.4rem",
    fontFamily: roboto.n700
  },
  headerWork: {
    fontSize: "1.2rem",
    fontFamily: roboto.n400
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
    fontFamily: roboto.n400,
    borderTop: "1px solid #DBDBDB"
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
      <div className={css(styles.skills)}>
        {skills.map((skill) => (
          <span key={skill} className={css(styles.tag)}>
            {skill}
          </span>
        ))}
      </div>
      <div className={css(styles.footer)}>{`${moment(from).format(
        "MMM YYYY"
      )} - ${
        moment() < moment(to) ? "present" : moment(to).format("MMM YYYY")
      }`}</div>
    </div>
  );
};
