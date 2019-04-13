import React from "react";
import { Column, Card, Title, Image, Media, Content } from "rbx";
import "rbx/index.css";

import "./ProjectCards.css";

const ProjectCards = props => {
  let items = null;
  if (props.projectItems) {
    items = props.projectItems.map(item => (
      <Column key={item.name}>
        <Card>
          <Card.Image>
            <Image.Container size={128}>
              <Image src={item.image} />
            </Image.Container>
          </Card.Image>
          <Card.Content>
            <Media>
              <Media.Item>
                <Title as="p" size={4}>
                  {item.name}
                </Title>
              </Media.Item>
            </Media>
            <Content>{item.description}</Content>
          </Card.Content>
        </Card>
      </Column>
    ));
  }

  return (
    <Column.Group textAlign="centered" multiline centered>
      {items}
    </Column.Group>
  );
};

export default ProjectCards;
