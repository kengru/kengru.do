import React from "react";
import { Column, Card, Tag } from "rbx";
import "rbx/index.css";

import "./WorkCards.css";

const WorkCards = props => {
  let items = null;
  if (props.workItems.length) {
    items = props.workItems.map(item => (
      <Column key={item.company} size={4}>
        <Card>
          <Card.Header>
            <Card.Header.Title>
              {item.position} @ {item.company}
            </Card.Header.Title>
          </Card.Header>
          <Card.Footer textAlign="centered" style={{ display: "block" }}>
            {item.skills.map(skill => (
              <Tag key={skill}>{skill}</Tag>
            ))}
          </Card.Footer>
          <Card.Footer>
            <Card.Footer.Item >
              {item.from} - {item.to}
            </Card.Footer.Item>
          </Card.Footer>
        </Card>
      </Column>
    ));
  }

  return (
    <Column.Group
      className="work-column"
      textAlign="centered"
      multiline
      centered
    >
      {items}
    </Column.Group>
  );
};

export default WorkCards;
