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
          <Card.Content>
            <Content>
              In charge of developing new features for a managing website using
              ASP.NET as the backend of the application and Vue.js as the front
              end.
            </Content>
          </Card.Content>
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
          <Card.Content>
            <Content>
              In charge of developing and maintaining the websites for updating
              the clients and users of the different applications used in
              Instacarro. Creating APIs in Node.js using the koa.js framework on
              top of it while using mongo db and it's language as a mean to
              connection to the database. Also on the front side of the
              development using Angular.js and React.js both on different parts
              of the web pages.
            </Content>
          </Card.Content>
          <Card.Footer>
            <Tag>node.js</Tag>
            <Tag>angular.js</Tag>
            <Tag>mongoDb</Tag>
            <Tag>docker</Tag>
            <Tag>aws</Tag>
          </Card.Footer>
        </Card>
      </Column>
    </div>
  );
};

export default NewBio;
