import React from "react";
import { Column, Card, Title, Image, Media, Content, Tag } from "rbx";
import "rbx/index.css";

import "./ProjectCards.css";

const ProjectCards = props => {
  let items = null;
  if (props.projectItems.length) {
    items = props.projectItems.map(item => (
      <Column key={item.name} size={3}>
        <Card>
          <Card.Image>
            <Image.Container size="100">
              <Image src={item.image} />
            </Image.Container>
          </Card.Image>
          <Card.Content>
            <Media>
              <Media.Item>
                <Title
                  as="a"
                  size={4}
                  href={item.vc}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name} &nbsp;
                  <i className="fas fa-link" />
                </Title>
              </Media.Item>
            </Media>
            <Content>{item.description}</Content>
          </Card.Content>
          <Card.Footer>
            <Card.Footer.Item
              as="a"
              href={item.vc}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source Code
            </Card.Footer.Item>
            {item.link ? (
              <Card.Footer.Item
                as="a"
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live link
              </Card.Footer.Item>
            ) : null}
          </Card.Footer>
          <Card.Footer  style={{ display: "block" }}>
            {item.tools.map(skill => (
              <Tag key={skill}>{skill}</Tag>
            ))}
          </Card.Footer>
        </Card>
      </Column>
    ));
  }

  return (
    <Column.Group textAlign="centered" multiline>
      {items}
    </Column.Group>
  );
};

export default ProjectCards;
