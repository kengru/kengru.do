import React from 'react';

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const styles = {
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
}

const navItem = props => {
  const { classes } = props
  return (
    <>
      <Typography component="h3" variant="headline" className={classes.grow}>
        {props.title}
      </Typography>
    </>
  ) 
}

export default withStyles(styles)(navItem);