import React from 'react';
import { Column, List, Title } from "rbx";
import "rbx/index.css";

import "./NewBio.css";

const NewBio = () => {
  return (
    <div className="bio">
      <Column size="one-quarter">
        <List>
          <List.Item>Personal Info</List.Item>
          <List.Item>Work Experience</List.Item>
          <List.Item>Education</List.Item>
        </List>
      </Column>
      <Column textAlign="centered">
        <Title size={2}>Kendry Alexander Grullón</Title>
        <Title size={3}>kengrullon@gmail.com</Title>
        <Title size={3}>New text</Title>
      </Column>
    </div>
  )
}

export default NewBio
