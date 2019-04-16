import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ProjectCards from "./ProjectCards";
import { Column, Card } from "rbx";

const cards = [
  {
    name: "Test 1",
    description: "a test for cards",
    vc: "somelink",
    image: "some image",
    tools: ["one skill", "two skills", "three skills"]
  },
  {
    name: "Test 2",
    description: "another test for cards",
    vc: "some other link",
    image: "some other image",
    tools: ["one skill", "two skills", "three skills"]
  },
  {
    name: "Test 3",
    description: "wow tests for cards",
    vc: "a lot link",
    image: "s img",
    tools: ["one skill", "two skills", "three skills"]
  }
];

configure({ adapter: new Adapter() });

describe("<ProjectCards />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ProjectCards projectItems={cards} />);
  });

  it(`should render one <Column.Group /> element`, () => {
    expect(wrapper.find(Column.Group)).toHaveLength(1);
  });

  it(`should render three <Card /> element`, () => {
    expect(wrapper.find(Card)).toHaveLength(3);
  });
  
  it(`should have footers on project items`, () => {
    expect(wrapper.find(Card.Footer).exists()).toEqual(true);
  });

  it(`should have three project items`, () => {
    expect(wrapper.props().children).toHaveLength(3);
  });

  it(`should say "Test 1" on the first project item`, () => {
    expect(wrapper.props().children[0].key).toEqual("Test 1");
  });
});
