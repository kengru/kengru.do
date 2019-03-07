import React from 'react';

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import NavItem from "./NavItem/NavItem";

const styles = {
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
}

const navItems = props => {
  const { classes } = props
  return (
    <>
      <Typography component="h3" variant="headline" className={classes.grow}>
        {props.title}
      </Typography>
      <NavItem linkTo="/bio" linkName="Bio"/>
      <NavItem linkTo="/projects" linkName="Projects"/>
      <NavItem linkTo="/nature" linkName="Nature"/>
      <NavItem linkTo="/challenges" linkName="Challenges"/>
    </>
  ) 
}

export default withStyles(styles)(navItems);