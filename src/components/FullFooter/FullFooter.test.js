import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import FullFooter from "./FullFooter";
import { Footer } from "rbx";

configure({ adapter: new Adapter() });

describe("<FullFooter />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<FullFooter />);
  });

  it(`should render one <Footer /> element`, () => {
    expect(wrapper.find(Footer)).toHaveLength(1);
  });

  it(`should render three links`, () => {
    expect(wrapper.find("a")).toHaveLength(3);
  });

  it(`should have link elements with target blank`, () => {
    expect(
      wrapper.find("a").filterWhere(item => {
        return item.prop("target") === "_blank";
      })
    ).toHaveLength(3);
  });

  it(`should have the footer class`, () => {
    expect(wrapper.exists(".footer")).toEqual(true);
  });
});
