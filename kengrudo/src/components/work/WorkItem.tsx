import React from "react";
import { StyleSheet, css } from "aphrodite/no-important";

import { rales } from "../../fonts/fonts";

const styles = StyleSheet.create({
  workItem: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    height: "150px",
    perspective: "600px",
    margin: "1em",
    padding: "1.6em",
    zIndex: 1,
    fontSize: "calc(7px + 1vmin)",
    boxShadow: "0px 0px 6px 1px rgba(0,0,0,0.1)",
    borderRadius: "0.5em"
  },
  card: {
    width: "100%",
    height: "100%",
    position: "relative",
    userSelect: "none",
    transition: "transform 0.4s",
    transformStyle: "preserve-3d",
    ":hover": {
      transform: "rotateY(180deg)"
    },
  },
  cardFace: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backfaceVisibility: "hidden"
  },
  front: {
    display: "flex",
    flexDirection: "column"
  },
  back: {
    display: "flex",
    flexDirection: "column",
    transform: "rotateY(180deg)"
  },
  title: {
    paddingTop: "0.8em"
  },
  place: {
    fontFamily: rales.n500
  },
  date: {
    fontSize: "calc(7px + 1vmin)",
    fontFamily: rales.n400
  },
  text: {
    fontFamily: rales.n500,
    textAlign: "center",
    fontSize: "calc(2px + 2vmin)"
  },
  at: {
    fontFamily: rales.i500,
    paddingTop: "0.6em",
    textAlign: "center"
  }
});

function WorkItem() {
  return (
    <div className={css(styles.workItem)}>
      <div className={css(styles.card)}>
        <div className={css(styles.cardFace, styles.front)}>
          <div className={css(styles.text)}>Software Developer</div>
          <span className={css(styles.at)}>@</span>
          <div className={css(styles.title)}>
            <div className={css(styles.place)}>
              Asistencia y Gestión Logística (AGL)
            </div>
            <div className={css(styles.date)}>Jan 2020 - Present</div>
          </div>
        </div>
        <div className={css(styles.cardFace, styles.back)}>
          Vainas y un par de cosas en vdd <br /> pila de vaina i guess
        </div>
      </div>
    </div>
  );
}

export { WorkItem };
