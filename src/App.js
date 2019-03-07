import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Toolbar from "./components/Toolbar/Toolbar";
import Bio from "./containers/Bio/Bio";
import P5Wrapper from "./components/P5Wrapper/P5Wrapper";
import "./App.css";

class App extends Component {
  onSetAppState = (newState, cb) => this.setState(newState, cb);

  render() {
    return (
      <div className="App">
        <Toolbar />
        <Switch>
          <Route path="/bio" component={Bio} />
          <Route path="/projects" component={Bio} />
          <Route path="/nature" component={Bio} />
          <Route
            path="/challenges"
            render={() => (
              <P5Wrapper
                p5Props={{ slider: 100 }}
                onSetAppState={this.onSetAppState}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
