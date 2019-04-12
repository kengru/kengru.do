import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Hero, Navbar, Section, Container, Footer, Content } from "rbx";
import "rbx/index.css";

import "./NewApp.css";
import NewBio from "../NewBio/NewBio";

export default class NewApp extends Component {
  render() {
    return (
      <div className="site">
        <Section>
          <Container>
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
          </Container>
        </Section>
        <Hero size="medium" className="site-content">
          <Hero.Body>
            <Switch>
              <Route path="/" component={NewBio} />
            </Switch>
          </Hero.Body>
        </Hero>
        <Footer>
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
