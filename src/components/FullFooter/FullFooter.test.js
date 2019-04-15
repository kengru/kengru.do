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

  it("should render one <Footer /> element", () => {
    expect(wrapper.find(Footer)).toHaveLength(1);
  });

  it("should render three links", () => {
    expect(wrapper.find("a")).toHaveLength(3);
  });
});
