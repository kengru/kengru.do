import React from "react";
import { NavLink } from "react-router-dom";
import { Column, Title, Card, Media, Content, Image } from "rbx";

const GamesMenu = props => {
  let items = null;
  if (props.games.length) {
    items = props.games.map(item => (
      <Column key={item.name} size={3}>
        <Card>
          <Card.Image>
            <Image.Container size="1by1">
              <Image src={item.image} />
            </Image.Container>
          </Card.Image>
          <Card.Content>
            <Media>
              <Media.Item style={{ textAlign: "center" }}>
                <Title as={NavLink} size={4} to={"/games" + item.route}>
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
    <Column.Group textAlign="centered" multiline>
      {items}
    </Column.Group>
  );
};

export default GamesMenu;
