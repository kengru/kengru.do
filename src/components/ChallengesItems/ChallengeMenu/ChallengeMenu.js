import React from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { Menu, Section} from "rbx";
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
        active={item.link === props.location.pathname.slice(11)}
      >
        {item.text}
      </Menu.List.Item>
    ));
  }

  return (
    <Section>
      <Menu>
        <Menu.Label textSize={4} textWeight="bold" textColor="black">Challenges</Menu.Label>
        <Menu.List className="menu-list">{items}</Menu.List>
      </Menu>
    </Section>
  );
};

export default withRouter(ChallengeMenu);
