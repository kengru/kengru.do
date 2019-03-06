import React from "react";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import NavItems from "../NavItems/NavItems";


const styles = {
  root: {
    flexGrow: 1
  },
  toolbar: {
    backgroundColor: "#547980"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const toolbar = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <NavItems/>
        </Toolbar>
      </AppBar>
    </div>  
  )
};

export default withStyles(styles)(toolbar);
