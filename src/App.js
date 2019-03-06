import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Toolbar from "./components/Toolbar/Toolbar";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Toolbar />
        <Typography variant="display1" align="right" gutterBottom>
          Kendry Alexander Grullon
        </Typography>
        <Route path="/bio" render={() => (<div>Hello</div>)}/>
      </div>
    );
  }
}

export default App;
