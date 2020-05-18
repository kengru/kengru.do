import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { NavLink } from "react-router-dom";
import Navigation from "./Navigation";
import { Navbar, Button } from "rbx";

configure({ adapter: new Adapter() });

describe("<Navigation />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Navigation />);
  });

  it(`should render one <Navbar /> element`, () => {
    expect(wrapper.find(Navbar)).toHaveLength(1);
  });

  it(`should render one <Navbar.Brand /> element`, () => {
    expect(wrapper.find(Navbar.Brand)).toHaveLength(1);
  });

  it(`should render five <NavLink /> elements`, () => {
    expect(wrapper.find(NavLink)).toHaveLength(5);
  });

  it(`should render four icon elements`, () => {
    expect(wrapper.find("i")).toHaveLength(4);
  });

  it(`should render one download button`, () => {
    expect(wrapper.find(Button)).toHaveLength(1);
  });
});
