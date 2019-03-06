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
