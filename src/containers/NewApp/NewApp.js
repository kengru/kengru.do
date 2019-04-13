import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Hero } from "rbx";
import "rbx/index.css";

import "./NewApp.css";
import Navigation from "../../components/Navigation/Navigation";
import FullFooter from "../../components/FullFooter/FullFooter";
import Bio from "../Bio/Bio";
import NewProjects from "../NewProjects/NewProjects";

class NewApp extends Component {
  render() {
    return (
      <div className="site">
        <Navigation />
        <Hero size="medium" className="site-content">
          <Hero.Body>
            <Switch>
              <Route path="/projects" component={NewProjects} />
              <Route path="/" component={Bio} />
            </Switch>
          </Hero.Body>
        </Hero>
        <FullFooter />
      </div>
    );
  }
}

export default NewApp;
