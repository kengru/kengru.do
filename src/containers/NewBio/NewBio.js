import React from 'react';
import { Column, List, Title, Content } from "rbx";
import "rbx/index.css";

import "./NewBio.css";

const NewBio = () => {
  return (
    <div className="bio">
      <Column size="one-quarter">
        <Content>
          <Title size={4}>Kendry Alexander Grullón</Title>
          <p>A 24 years old programmer from Dominican Republic <br/> asd</p>
        </Content>
      </Column>
      <Column textAlign="centered">
        
      </Column>
    </div>
  )
}

export default NewBio
