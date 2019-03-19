/*
  Description:
    The starting point component, holds the Menu, Toolbar and the different containers.
*/

import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";

import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "../../components/Toolbar/Toolbar";
import Menu from "../../components/Menu/Menu";
import Bio from "../Bio/Bio";
import Challenges from "../Challenges/Challenges";
import Projects from "../Projects/Projects";

import "./App.css";

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar
});

class App extends Component {
  state = {
    classes: this.props.classes
  };

  render() {
    return (
      <div className="App">
        <Toolbar />
        <Menu />
        <CssBaseline />
        <main className={this.state.classes.content}>
          <div className={this.state.toolbar} />
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className="switch"
          >
            <Route path="/bio" component={Bio} />
            <Route path="/projects" component={Projects} />
            <Route path="/nature" component={Bio} />
            <Route path="/challenges" component={Challenges} />
            <Redirect to="/bio" from="/" />
          </AnimatedSwitch>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(App);
