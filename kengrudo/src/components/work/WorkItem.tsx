import React from "react";
import { StyleSheet, css } from "aphrodite/no-important";

import { rales } from "../../fonts/fonts";

const styles = StyleSheet.create({
  work: {
    display: "flex",
    flexDirection: "column",
    padding: "1em",
    fontSize: "",
    zIndex: 1,
    boxShadow: "0px 0px 6px 1px rgba(0,0,0,0.3)",
    borderRadius: "1em"
  },
  logo: {
    alignSelf: "flex-start"
  },
  title: {
    paddingTop: "0.2em"
  },
  name: {
    fontFamily: rales.i500
  },
  date: {
    fontSize: "calc(7px + 1vmin)",
    fontFamily: rales.n300
  },
  text: {
    fontSize: "calc(9px + 1vmin)"
  }
});

function WorkItem() {
  return (
    <div className={css(styles.work)}>
      <div className={css(styles.title)}>
        <div className={css(styles.name)}>Asistencia y Gestión Logística</div>
        <div className={css(styles.date)}>Jan 2020 - Present</div>
      </div>
      <p className={css(styles.text)}>
        Programming things, mainly using javascript.
        <br />I have developed a thing for 3D.
      </p>
    </div>
  );
}

export { WorkItem };
