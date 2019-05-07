import React from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { Menu, Section } from "rbx";
import "rbx/index.css";

import "./NatureMenu.css";

const NatureMenu = props => {
  let items = null;
  if (props.menuItems.length) {
    items = props.menuItems.map(item => (
      <Menu.List.Item
        key={item.text}
        as={NavLink}
        to={"/nature" + item.link}
        active={item.link === props.location.pathname.slice(11)}
      >
        {item.text}
      </Menu.List.Item>
    ));
  }

  return (
    <Section>
      <Menu>
        <Menu.Label textSize={4} textWeight="bold" textColor="black">
          Nature
        </Menu.Label>
        <Menu.List className="menu-list">{items}</Menu.List>
      </Menu>
    </Section>
  );
};

export default withRouter(NatureMenu);
