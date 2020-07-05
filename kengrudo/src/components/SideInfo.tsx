import React from "react";
import { StyleSheet, css } from "aphrodite/no-important";

import { rales } from "../fonts/fonts";
import logo from "../images/kengru_logo.png";

const styles = StyleSheet.create({
  side: {
    display: "flex",
    height: "100%",
    width: "20%",
    paddingLeft: "2em",
    flexDirection: "column",
    justifyContent: "center",
    fontSize: "calc(3px + 2vmin)",
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
  }
});

function SideInfo() {
  return (
    <div className={css(styles.side)}>
      <img className={css(styles.logo)} src={logo} alt="logo" />
      <div className={css(styles.name)}>Kendry Alexander Grullón</div>
      <p className={css(styles.text)}>
        Programming things, mainly using javascript
        <br />I have developed a thing for 3D.
      </p>
    </div>
  );
}

export { SideInfo };
