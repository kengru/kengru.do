import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "./components/Toolbar/Toolbar";
import Menu from "./components/Menu/Menu";
import Bio from "./containers/Bio/Bio";
import Challenges from "./containers/Challenges/Challenges";

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
          <Switch>
            <Route path="/bio" component={Bio} />
            <Route path="/projects" component={Bio} />
            <Route path="/nature" component={Bio} />
            <Route path="/challenges" component={Challenges} />
            <Redirect to="/bio" from="/" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(App);
