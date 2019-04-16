import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Section } from "rbx";
import "rbx/index.css";

import "./ChallengeMenu.css";

const ChallengeMenu = () => {
  return (
    <Section>
      <Menu>
        <Menu.Label>Challenges</Menu.Label>
        <Menu.List>
          <Menu.List.Item>Starfield</Menu.List.Item>
          <Menu.List.Item>Starfield</Menu.List.Item>
          <Menu.List.Item>Starfield</Menu.List.Item>
        </Menu.List>
      </Menu>
    </Section>
  );
};

export default ChallengeMenu;
