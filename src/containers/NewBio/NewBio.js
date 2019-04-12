import React from "react";
import { Column, Title, Content } from "rbx";
import "rbx/index.css";

import "./NewBio.css";
import WorkCards from "../../components/BioItems/WorkCards/WorkCards";

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
      <WorkCards />
    </div>
  );
};

export default NewBio;
