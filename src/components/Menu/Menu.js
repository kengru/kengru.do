import React from "react";
import { NavLink } from "react-router-dom";

const Menu = props => {
  console.log(props);
  return (
    <div>
      <ul>
        <li>
          <NavLink to={`${props.match.path}/info`}>Personal Info</NavLink>
        </li>
        <li>Work Experience</li>
        <li>Education</li>
        <li>Contact Info</li>
      </ul>
    </div>
  );
};

export default Menu;
