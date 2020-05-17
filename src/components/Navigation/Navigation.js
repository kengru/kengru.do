import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Section, Container, Button } from "rbx";
import "rbx/index.css";

import "./Navigation.css";

function nItem() {
  var menu = document.querySelector(".navbar-menu");
  var burger = document.querySelector(".navbar-burger");
  menu.classList.toggle("is-active");
  burger.classList.toggle("is-active");
}

const Navigation = () => {
  return (
    <Section>
      <Container>
        <Navbar>
          <Navbar.Brand>
            <Navbar.Item>
              <img
                src={`https://firebasestorage.googleapis.com/v0/b/kengru-do.appspot.com/o/public%2Fkengru_web_b.png?alt=media&token=8e1a3ca4-9f80-483d-adb0-f8b9b3df98e8`}
                alt="logo"
                width="112"
                height="70"
              />
            </Navbar.Item>
            <Navbar.Burger />
          </Navbar.Brand>
          <Navbar.Menu>
            <Navbar.Segment align="end">
              <Navbar.Item as="div" onClick={nItem}>
                <NavLink activeClassName="navActive" exact to="/">
                  Home
                </NavLink>
              </Navbar.Item>
              <Navbar.Item as="div" onClick={nItem}>
                <NavLink activeClassName="navActive" to="/projects">
                  Projects
                </NavLink>
              </Navbar.Item>
              {/* <Navbar.Item as="div" onClick={nItem}>
                <NavLink activeClassName="navActive" to="/games">
                  Games
                </NavLink>
              </Navbar.Item> */}
              <Navbar.Item as="div" onClick={nItem}>
                <NavLink activeClassName="navActive" to="/renders">
                  3D Modeling
                </NavLink>
              </Navbar.Item>
              <Navbar.Item as="div" className="is-hidden-mobile">
                <NavLink activeClassName="navActive" to="/challenges">
                  Challenges
                </NavLink>
              </Navbar.Item>
              <Navbar.Item as="div" className="is-hidden-mobile">
                <NavLink activeClassName="navActive" to="/nature">
                  Nature of Code
                </NavLink>
              </Navbar.Item>
            </Navbar.Segment>
            <Navbar.Segment align="end">
              <Navbar.Item
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/kengru"
                onClick={nItem}
              >
                <i className="fab fa-github" />
              </Navbar.Item>
              <Navbar.Item
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/kxngru"
                onClick={nItem}
              >
                <i className="fab fa-twitter" />
              </Navbar.Item>
              <Navbar.Item
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/kengru/"
                onClick={nItem}
              >
                <i className="fab fa-linkedin" />
              </Navbar.Item>
              <Navbar.Item
                target="_blank"
                rel="noopener noreferrer"
                href="https://medium.com/@kengru"
                onClick={nItem}
              >
                <i className="fab fa-medium-m" />
              </Navbar.Item>
              <Navbar.Item
                download
                target="_blank"
                rel="noopener noreferrer"
                href={`https://firebasestorage.googleapis.com/v0/b/kengru-do.appspot.com/o/public%2FKGrullon-Resume.pdf?alt=media&token=c884163a-356c-437e-9df5-5ca29c8b96f5`}
                onClick={nItem}
              >
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
