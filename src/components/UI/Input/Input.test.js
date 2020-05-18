import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Input from "./Input";

const input = {
  value: "none",
  type: "range",
  changed: () => true,
  config: []
};

configure({ adapter: new Adapter() });

describe("<Input />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Input {...input}/>);
  });

  it(`should not have the control class`, () => {
    expect(wrapper.exists(".Control")).toEqual(false);
  });

  it(`should have one <input /> element`, () => {
    expect(wrapper.find("input")).toHaveLength(1);
  });
});
