import React, { Component } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../store/actions";

import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import "./Menu.css";

const drawerWidth = 260;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar
});

class Menu extends Component {
  state = {
    classes: this.props.classes
  };

  componentDidMount() {
    this.props.onClearMenuItems();
  }

  render() {
    return (
      <Drawer
        className={this.state.classes.drawer}
        variant="permanent"
        classes={{
          paper: this.state.classes.drawerPaper
        }}
      >
        <div className={this.state.classes.toolbar} />
        <List>
          {this.props.menu ? this.props.menu.map(item => (
            <NavLink to={`/${this.props.path}${item.link}`} key={item.text}>
              <ListItem button>
                <ListItemText primary={item.text} />
              </ListItem>
            </NavLink>
          ))  : null}
        </List>
        <Divider />
      </Drawer>
    );
  }
}

const mapStateToProps = state => {
  return {
    menu: state.menu.menuItems,
    path: state.menu.path
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClearMenuItems: () => dispatch(actions.clearMenuItems())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Menu)));
