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
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import "./Menu.css";

const drawerWidth = 300;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  toolbar: theme.mixins.toolbar
});

class Menu extends Component {
  state = {
    expanded: null
  };

  componentDidMount() {
    if (this.props.location) {
      this.props.onFetchMenu(this.props.location.pathname.slice(1));
    } else {
      this.props.onFetchMenu("bio");
    }
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    let inChallengesMenu = (
      <List>
        {this.props.inChallenges &&
        this.props.menu[this.props.location.pathname]
          ? this.props.menu.map(item => (
              <ExpansionPanel
                expanded={expanded === `panel${item.order}`}
                onChange={this.handleChange(`panel${item.order}`)}
                key={item.order}
              >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>
                    {item.text}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  {console.log(item)}
                  {item.controls.map(control => (
                    <div key={control.name}>
                      <label>{control.name}</label>
                      <input
                        type={control.type}
                        min={control.min}
                        max={control.max}
                      />
                    </div>
                  ))}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))
          : null}
      </List>
    );

    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <List>
          {this.props.menu && !this.props.inChallenges
            ? this.props.menu.map(item => (
                <NavLink to={`/${this.props.path}${item.link}`} key={item.text}>
                  <ListItem button>
                    <ListItemText primary={item.text} />
                  </ListItem>
                </NavLink>
              ))
            : null}
        </List>
        {this.props.inChallenges ? inChallengesMenu : null}
      </Drawer>
    );
  }
}

const mapStateToProps = state => {
  return {
    menu: state.menuItems,
    path: state.path,
    inChallenges: state.inChallenges
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClearMenuItems: () => dispatch(actions.clearMenuItems()),
    onFetchMenu: value => dispatch(actions.fetchMenuAsync(value))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(Menu))
);
