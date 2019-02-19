import React, { Component } from 'react';
import Toolbar from '../../components/Toolbar/Toolbar';
import appCss from './App.css';

class App extends Component {
  render() {
    return (
      <div className={appCss.App}>
        <Toolbar title={'kengru'}></Toolbar>
      </div>
    );
  }
}

export default App;
