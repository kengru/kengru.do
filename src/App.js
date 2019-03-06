import React, { Component } from 'react';

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
      </div>
    );
  }
}

export default App;
