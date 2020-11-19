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
    boxShadow: "0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1)",
    transition: "transform 0.2s linear",
    ":hover": {
      transform: "scale(1.05, 1.05)"
    },
    "@media (max-width: 1450px)": {
      width: "10em"
    },
    "@media (max-width: 500px)": {
      alignSelf: "center",
      width: "14em"
    }
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
    height: "4em",
    padding: "0em 1em 1em 1em",
    backgroundColor: "initial",
    "@media (max-width: 1450px)": {
      height: "3em"
    }
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
    wordBreak: "break-word",
    "@media (max-width: 1450px)": {
      fontSize: "1rem"
    },
    "@media (max-width: 500px)": {
      fontSize: "1.2rem"
    }
  },
  contentBody: {
    textAlign: "center",
    fontSize: "1rem",
    "@media (max-width: 1450px)": {
      fontSize: "0.7rem"
    },
    "@media (max-width: 500px)": {
      display: "none"
    }
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
    borderTop: "1px solid #DBDBDB",
    "@media (max-width: 1450px)": {
      fontSize: "0.7rem",
      padding: "0.5rem"
    },
    "@media (max-width: 500px)": {
      fontSize: "0.9rem",
      padding: "0.6rem"
    }
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
    justifyContent: "center",
    alignContent: "center",
    ":not(:last-child)": {
      borderRight: "1px solid #dbdbdb"
    },
    "@media (max-width: 1450px)": {
      padding: "0.4rem 0.2rem 0.4rem"
    }
  }
});

type Props = {
  name: string;
  desc: string;
  img: string;
  code: string;
  live: string;
  skills: string[];
};

export const ProjectItem = (props: Props) => {
  const { name, desc, img, code, live, skills } = props;

  return (
    <div className={css(styles.main)}>
      <div className={css(styles.cardImage)}>
        <figure className={css(styles.image)}>
          <img className={css(styles.hasRatio)} src={img} alt={name} />
        </figure>
      </div>
      <div className={css(styles.content)}>
        <div className={css(styles.contentTitle)}>
          <span className={css(styles.contentTitleText)}>{name}</span>
        </div>
        <div className={css(styles.contentBody)}>{desc}</div>
      </div>
      <div className={css(styles.footer)}>
        {code !== "" ? (
          <a
            className={css(styles.footerItem)}
            target="_blank"
            rel="noopener noreferrer"
            href={code}
          >
            Source Code
          </a>
        ) : null}
        {live !== "" ? (
          <a
            className={css(styles.footerItem)}
            target="_blank"
            rel="noopener noreferrer"
            href={live}
          >
            Live
          </a>
        ) : null}
      </div>
      <div className={css(styles.skills)}>
        {skills.map((skill) => (
          <span key={skill} className={css(styles.tag)}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};
