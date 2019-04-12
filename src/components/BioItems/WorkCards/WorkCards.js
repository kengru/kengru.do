import React from "react";
import { Column, Card, Tag } from "rbx";
import "rbx/index.css";

const WorkCards = () => {
  return (
    <Column.Group textAlign="centered">
      <Column>
        <Card>
          <Card.Header>
            <Card.Header.Title>Web Developer @ Necomplus</Card.Header.Title>
          </Card.Header>
          <Card.Footer>
            <Tag>vue.js</Tag>
            <Tag>c#</Tag>
          </Card.Footer>
        </Card>
      </Column>
      <Column>
        <Card>
          <Card.Header>
            <Card.Header.Title>
              Full-Stack Developer @ Instacarro.com
            </Card.Header.Title>
          </Card.Header>
          <Card.Footer>
            <Tag>node.js</Tag>
            <Tag>angular.js</Tag>
            <Tag>mongoDb</Tag>
            <Tag>docker</Tag>
            <Tag>aws</Tag>
          </Card.Footer>
          <Card.Footer>
            <Card.Footer.Item>2016 - 2018</Card.Footer.Item>
          </Card.Footer>
        </Card>
      </Column>
    </Column.Group>
  );
};

export default WorkCards;
