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
import Nature from "../Nature/Nature";
import Renders from "../Renders/Renders";

class App extends Component {
  render() {
    return (
      <div className="site">
        <Navigation />
        <Hero size="medium" className="site-content">
          <Switch>
            <Route path="/renders" component={Renders} />
            <Route path="/nature" component={Nature} />
            <Route path="/challenges" component={Challenges} />
            <Route path="/projects" component={Projects} />
            <Route path="/" component={Bio} />
          </Switch>
        </Hero>
        <FullFooter />
      </div>
    );
  }
}

export default withRouter(App);
