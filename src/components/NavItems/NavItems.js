/*
  Description:
    Content inside the toolbar.
  Props:
    title: holds the Toolbar title, depending on the container the user is on.
      Data comes from Redux.
*/

import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import NavItem from "./NavItem/NavItem";

const styles = {
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class NavItems extends Component {
  state = {
    classes: this.props.classes
  };
  render() {
    return (
      <>
        <Typography style={{ color: "white" }}
          component="h3"
          variant="headline"
          className={this.state.classes.grow}
        >
          {this.props.title.charAt(0).toUpperCase() + this.props.title.slice(1)}
        </Typography>
        <NavItem linkTo="/bio" linkName="Bio" />
        <NavItem linkTo="/projects" linkName="Projects" />
        <NavItem linkTo="/nature" linkName="Nature" />
        <NavItem linkTo="/challenges" linkName="Challenges" />
        <NavItem linkTo="/hub" linkName="Hub" />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    title: state.menu.path
  };
};

export default connect(mapStateToProps)(withStyles(styles)(NavItems));
