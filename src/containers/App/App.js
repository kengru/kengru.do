import React, { Component } from "react";
import { Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import { Hero } from "rbx";
import "rbx/index.css";

import "./App.css";
import animations from "./appTransitions";
import Navigation from "../../components/Navigation/Navigation";
import FullFooter from "../../components/FullFooter/FullFooter";
import Bio from "../Bio/Bio";
import Projects from "../Projects/Projects";

class App extends Component {
  render() {
    return (
      <div className="site">
        <Navigation />
        <Hero size="medium" className="site-content">
          <Hero.Body>
            <AnimatedSwitch
              atEnter={animations.atEnter}
              atLeave={animations.atLeave}
              atActive={animations.atActive}
              className="switchAnimation"
            >
              <Route path="/projects" component={Projects} />
              <Route path="/" component={Bio} />
            </AnimatedSwitch>
          </Hero.Body>
        </Hero>
        <FullFooter />
      </div>
    );
  }
}

export default App;
