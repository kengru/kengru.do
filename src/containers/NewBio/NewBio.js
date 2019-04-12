import React from "react";
import { Column, Title, Content, Card, Tag } from "rbx";
import "rbx/index.css";

import "./NewBio.css";

const NewBio = () => {
  return (
    <div className="bio">
      <Column size="one-third">
        <Content>
          <Title size={4}>Kendry Alexander Grullón</Title>
          <p>
            A 24 years old programmer from Dominican Republic <br /> asd
          </p>
        </Content>
      </Column>
      <Column textAlign="centered">
        <Card>
          <Card.Header>
            <Card.Header.Title>Web Developer @ Necomplus</Card.Header.Title>
          </Card.Header>
          <Card.Footer>
            <Tag>vue.js</Tag>
            <Tag>c#</Tag>
          </Card.Footer>
        </Card>
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
            <Card.Footer.Item>
              2016 - 2018
            </Card.Footer.Item>
          </Card.Footer>
        </Card>
      </Column>
    </div>
  );
};

export default NewBio;
