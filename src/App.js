import React, { Component } from "react";
import { Route } from "react-router-dom";

import Toolbar from "./components/Toolbar/Toolbar";
import Bio from "./containers/Bio/Bio";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Toolbar />
        <Route path="/bio" component={Bio} />
      </div>
    );
  }
}

export default App;
