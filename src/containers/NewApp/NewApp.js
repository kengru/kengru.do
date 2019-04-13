import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Hero } from "rbx";
import "rbx/index.css";

import "./NewApp.css";
import Navigation from "../../components/Navigation/Navigation";
import FullFooter from "../../components/FullFooter/FullFooter";
import Bio from "../Bio/Bio";

class NewApp extends Component {
  render() {
    return (
      <div className="site">
        <Navigation />
        <Hero size="medium" className="site-content">
          <Hero.Body>
            <Switch>
              <Route path="/" component={Bio} />
              {/* <Route path="/projects" component={} /> */}
            </Switch>
          </Hero.Body>
        </Hero>
        <FullFooter />
      </div>
    );
  }
}

export default NewApp;
