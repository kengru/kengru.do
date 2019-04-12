import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Section, Container, Button } from "rbx";
import "rbx/index.css";

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
              <Navbar.Item active as="div">
                <NavLink to="/">Home</NavLink>
              </Navbar.Item>
              <Navbar.Item as="div">
                <NavLink to="/projects">Projects</NavLink>
              </Navbar.Item>
              <Navbar.Item as="div">
                <NavLink to="/challenges">Challenges</NavLink>
              </Navbar.Item>
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
