import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

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
    console.log("[componentDidMount]");
  }

  render() {
    console.log(this.props);

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
          {this.props.menu.map(item => (
            <ListItem button key={item.text}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  }
}

const mapStateToProps = state => {
  return {
    menu: state.menuItems
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Menu)));
