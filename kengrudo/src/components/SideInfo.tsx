import React from "react";
import { Link, NavLink } from "react-router-dom";
import { StyleSheet, css } from "aphrodite/no-important";

import { rales } from "../fonts/fonts";
import logo from "../images/kengru_logo.png";

const styles = StyleSheet.create({
  side: {
    display: "flex",
    width: "18em",
    height: "100%",
    paddingLeft: "2em",
    flexDirection: "column",
    justifyContent: "center",
    fontSize: "calc(3px + 2vmin)"
  },
  logo: {
    alignSelf: "flex-start"
  },
  name: {
    paddingTop: "0.2em",
    fontSize: rales.i500
  },
  text: {
    fontSize: "calc(9px + 1vmin)"
  },
  navList: {
    display: "flex",
    flexDirection: "column",
    listStyle: "none",
    padding: "0em"
  },
  listItem: {
    color: "#07020D",
    width: "fit-content",
    textDecoration: "none",
    padding: "0.4em 0em 0.4em 0em",
    transform: "perspective(1px) translateZ(0)",
    transitionProperty: "transform",
    transitionDuration: "0.3s",
    ":hover": {
      transform: "translateX(8px)"
    }
  },
  listItemActive: {
    fontWeight: "bold"
  }
});

function SideInfo() {
  return (
    <div className={css(styles.side)}>
      <Link to="/">
        <img className={css(styles.logo)} src={logo} alt="logo" />
      </Link>
      <div className={css(styles.name)}>Kendry Alexander Grullón</div>
      <p className={css(styles.text)}>
        Programming things, mainly using javascript.
        <br />I have developed a thing for 3D.
      </p>
      <nav>
        <ul className={css(styles.navList)}>
          <NavLink
            activeClassName={css(styles.listItemActive)}
            className={css(styles.listItem)}
            to={"/work"}
          >
            work
          </NavLink>
          <NavLink
            activeClassName={css(styles.listItemActive)}
            className={css(styles.listItem)}
            to={"/projects"}
          >
            projects
          </NavLink>
          <NavLink
            activeClassName={css(styles.listItemActive)}
            className={css(styles.listItem)}
            to={"/skills"}
          >
            skills
          </NavLink>
        </ul>
      </nav>
    </div>
  );
}

export { SideInfo };
