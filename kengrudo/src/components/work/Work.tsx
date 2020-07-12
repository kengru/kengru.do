import React from "react";
import { StyleSheet, css } from "aphrodite/no-important";

import { rales } from "../../fonts/fonts";

const styles = StyleSheet.create({
  work: {
    display: "flex",
    height: "100%",
    width: "50%",
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
  }
});

function Work() {
  return (
    <div className={css(styles.work)}>
      <div className={css(styles.name)}>Kendry Alexander Grullón</div>
      <p className={css(styles.text)}>
        Programming things, mainly using javascript.
        <br />I have developed a thing for 3D.
      </p>
    </div>
  );
}

export { Work };
