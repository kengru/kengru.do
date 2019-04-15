import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Navigation from "./Navigation";
import { Navbar } from "rbx";

configure({ adapter: new Adapter() });

describe("<Navigation />", () => {
  it("should render one <Navbar /> element", () => {
    const wrapper = shallow(<Navigation />);
    expect(wrapper.find(Navbar)).toHaveLength(1);
  });
});
