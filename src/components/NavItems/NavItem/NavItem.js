/*
  Description:
    Buttons that hold individual NavLinks. 
  Props:
    linkTo: refers to the route it leads.
    linkName: the name of the section it links to.
*/

import React from "react";
import { NavLink } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import "./NavItem.css";

const styles = {
  link: {
    textDecoration: "none"
  }
};

const navItem = props => {
  const { classes } = props;

  return (
    <Button color="inherit">
      <NavLink to={props.linkTo} className={classes.link}>
        {props.linkName}
      </NavLink>
    </Button>
  );
};

export default withStyles(styles)(navItem);
