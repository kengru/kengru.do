import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Section } from "rbx";
import "rbx/index.css";

import "./ChallengeMenu.css";

const ChallengeMenu = props => {
  let items = null;
  if (props.menuItems.length) {
    items = props.menuItems.map(item => (
      <Menu.List.Item
        key={item.text}
        as={NavLink}
        to={"/challenges" + item.link}
      >
        {item.text}
      </Menu.List.Item>
    ));
  }

  return (
    <Section>
      <Menu>
        <Menu.Label>Challenges</Menu.Label>
        <Menu.List>{items}</Menu.List>
      </Menu>
    </Section>
  );
};

export default ChallengeMenu;
