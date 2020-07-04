import React from "react";
import { StyleSheet, css } from "aphrodite";

import logo from "../images/kengru_logo.png";

const styles = StyleSheet.create({
  side: {
    
  }
});

function SideInfo() {
  return (
    <div className={css(styles.side)}>
      <img src={logo} alt="logo" />
      <p>Kendry Alexander Grullón</p>
    </div>
  );
}

export { SideInfo };
