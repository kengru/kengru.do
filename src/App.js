import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Toolbar from "./components/Toolbar/Toolbar";
import Bio from "./containers/Bio/Bio";
import Challenges from "./containers/Challenges/Challenges";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Toolbar />
        <Switch>
          <Route path="/bio" component={Bio} />
          <Route path="/projects" component={Bio} />
          <Route path="/nature" component={Bio} />
          <Route path="/challenges" component={Challenges} />
        </Switch>
      </div>
    );
  }
}

export default App;
