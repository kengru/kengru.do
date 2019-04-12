import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Hero, Footer, Content } from "rbx";
import "rbx/index.css";

import "./NewApp.css";
import Navigation from "../../components/Navigation/Navigation";
import NewBio from "../NewBio/NewBio";

export default class NewApp extends Component {
  render() {
    return (
      <div className="site">
        <Navigation />
        <Hero size="medium" className="site-content">
          <Hero.Body>
            <Switch>
              <Route path="/" component={NewBio} />
            </Switch>
          </Hero.Body>
        </Hero>
        <Footer style={{ padding: "2rem 1.5rem 2rem"}}>
          <Content textAlign="centered">
            <p>
              <strong>kengru.do</strong> by{" "}
              <a href="https://github.com/kengru">Kendry Grullon</a>.
              <br />
              Created in 2019, using <a href="https://bulma.io">bulma.io</a>,
              with special help of the{" "}
              <a href="https://dfee.github.io/rbx/">rbx</a> library.
            </p>
          </Content>
        </Footer>
      </div>
    );
  }
}
