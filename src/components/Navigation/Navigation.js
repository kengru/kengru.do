import React from "react";

import "rbx/index.css";
import { Navbar, Section, Container, Button } from "rbx";

const Navigation = () => {
  return (
    <Section>
      <Container>
        <Navbar>
          <Navbar.Brand>
            <Navbar.Item>
              <img
                src="https://bulma.io/images/bulma-logo.png"
                alt=""
                width="112"
                height="70"
              />
            </Navbar.Item>
            <Navbar.Burger />
          </Navbar.Brand>
          <Navbar.Menu>
            <Navbar.Segment align="start">
              <Navbar.Item active>Home</Navbar.Item>
              <Navbar.Item>Projects</Navbar.Item>
              <Navbar.Item>Challenges</Navbar.Item>
            </Navbar.Segment>
            <Navbar.Segment align="end">
              <Navbar.Item>
                <i className="fab fa-github" />
              </Navbar.Item>
              <Navbar.Item>
                <i className="fab fa-twitter" />
              </Navbar.Item>
              <Navbar.Item>
                <i className="fab fa-medium-m" />
              </Navbar.Item>
              <Navbar.Item>
                <Button.Group>
                  <Button color="link">Resume</Button>
                </Button.Group>
              </Navbar.Item>
            </Navbar.Segment>
          </Navbar.Menu>
        </Navbar>
      </Container>
    </Section>
  );
};

export default Navigation;
