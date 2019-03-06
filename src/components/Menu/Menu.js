import React from "react";
import { NavLink } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import "./Menu.css";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

const Menu = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <List component="nav">
        <NavLink to={`${props.match.path}/info`}>
          <ListItem button>
            <ListItemText primary="Personal Info" />
          </ListItem>
        </NavLink>
      </List>
      <List>
        <ListItem button>
          <ListItemText primary="Work Experience" />
        </ListItem>
      </List>
      <List component="nav">
        <ListItem button>
          <ListItemText primary="Education" />
        </ListItem>
      </List>
    </div>
  );
};

export default withStyles(styles)(Menu);
