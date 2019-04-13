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
              <Navbar.Item as="div">
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
              <Navbar.Item target="_blank" rel="noopener noreferrer" href="https://github.com/kengru">
                  <i className="fab fa-github" />
              </Navbar.Item>
              <Navbar.Item target="_blank" rel="noopener noreferrer" href="https://twitter.com/kxngru">
                <i className="fab fa-twitter" />
              </Navbar.Item>
              <Navbar.Item target="_blank" rel="noopener noreferrer" href="https://medium.com/@kengru">
                <i className="fab fa-medium-m" />
              </Navbar.Item>
              <Navbar.Item download target="_blank" rel="noopener noreferrer" href={`https://firebasestorage.googleapis.com/v0/b/kengru-do.appspot.com/o/public%2FKGrullon-Resume.pdf?alt=media&token=c884163a-356c-437e-9df5-5ca29c8b96f5`}>
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
