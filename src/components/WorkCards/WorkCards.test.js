import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import WorkCards from "./WorkCards";
import { Column, Card } from "rbx";

const cards = [
  {
    position: "Test 1",
    company: "a test for cards",
    from: 1994,
    to: 1998,
    skills: ["one skill", "two skills", "three skills"]
  },
  {
    position: "Test 2",
    company: "another test for cards",
    from: 1994,
    to: 1998,
    skills: ["one skill", "two skills", "three skills"]
  }
];

configure({ adapter: new Adapter() });

describe("<WorkCards />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<WorkCards workItems={cards} />);
  });

  it(`should render one <Column.Group /> element`, () => {
    expect(wrapper.find(Column.Group)).toHaveLength(1);
  });

  it(`should render two <Card /> element`, () => {
    expect(wrapper.find(Card)).toHaveLength(2);
  });

  it(`should have footers on work items`, () => {
    expect(wrapper.find(Card.Footer).exists()).toEqual(true);
  });

  it(`should have two work items`, () => {
    expect(wrapper.props().children).toHaveLength(2);
  });

  it(`should say "a test for cards" on the first project item`, () => {
    expect(wrapper.props().children[0].key).toEqual("a test for cards");
  });
});
