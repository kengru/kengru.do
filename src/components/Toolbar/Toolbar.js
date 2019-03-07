import React from "react";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import NavItems from "../NavItems/NavItems";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  toolbar: {
    backgroundColor: "#547980"
  }
});

const toolbar = props => {
  const { classes } = props;
  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <NavItems />
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(toolbar);
