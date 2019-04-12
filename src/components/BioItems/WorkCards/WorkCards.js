import React from "react";
import { Column, Card, Tag } from "rbx";
import "rbx/index.css";

const WorkCards = props => {
  let items = null;
  if (props.workItems) {
    items = props.workItems.map(item => (
      <Column key={item.company}>
        <Card>
          <Card.Header>
            <Card.Header.Title>
              {item.position} @ {item.company}
            </Card.Header.Title>
          </Card.Header>
          <Card.Footer>
            {item.skills.map(skill => (
              <Tag key={skill}>{skill}</Tag>
            ))}
          </Card.Footer>
          <Card.Footer>
            <Card.Footer.Item>
              {item.from} - {item.to}
            </Card.Footer.Item>
          </Card.Footer>
        </Card>
      </Column>
    ));
  }

  return <Column.Group textAlign="centered">{items}</Column.Group>;
};

export default WorkCards;
