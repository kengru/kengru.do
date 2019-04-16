import React, { Component } from "react";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";
import { Hero } from "rbx";
import "rbx/index.css";

import "./App.css";
import Navigation from "../../components/Navigation/Navigation";
import FullFooter from "../../components/FullFooter/FullFooter";
import Bio from "../Bio/Bio";
import Projects from "../Projects/Projects";
import Challenges from "../Challenges/Challenges";
// import Challenges from "../Challenges/P5Container/P5Container";

class App extends Component {
  render() {
    return (
      <div className="site">
        <Navigation />
        <Hero size="medium" className="site-content">
          <Switch>
            <Route path="/challenges" component={Challenges} />
            <Route path="/projects" exact component={Projects} />
            <Route path="/" exact component={Bio} />
          </Switch>
        </Hero>
        <FullFooter />
      </div>
    );
  }
}

export default withRouter(App);
