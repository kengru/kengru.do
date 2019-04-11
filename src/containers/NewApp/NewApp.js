import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Hero, Navbar } from "rbx";
import "rbx/index.css";

import NewBio from "../NewBio/NewBio";

export default class NewApp extends Component {
  render() {
    return (
      <Hero size="fullheight-with-navbar">
        <Hero.Head>
          <Navbar>
            <Navbar.Brand>
              <Navbar.Item>
                <img
                  src="https://bulma.io/images/bulma-logo.png"
                  alt=""
                  width="112"
                  height="28"
                />
              </Navbar.Item>
              <Navbar.Burger />
            </Navbar.Brand>
          </Navbar>
        </Hero.Head>
        <Hero.Body>
          <Switch>
            <Route path="/" component={NewBio}></Route>
          </Switch>
        </Hero.Body>
      </Hero>
    );
  }
}
