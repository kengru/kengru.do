import React from "react";
import Gallery from "react-grid-gallery";
import { Title } from "rbx";

import "rbx/index.css";
import "./Render.css";

const Render = () => {
  const IMAGES = [
    {
      src: `${process.env.PUBLIC_URL}/rendered/piano.png`,
      thumbnail: `${process.env.PUBLIC_URL}/rendered/piano_th.png`,
      thumbnailWidth: 1920,
      thumbnailHeight: 1080,
      alt: "Piano",
      caption: "Piano"
    },
    {
      src: `${process.env.PUBLIC_URL}/rendered/palacio.png`,
      thumbnail: `${process.env.PUBLIC_URL}/rendered/palacio_th.png`,
      thumbnailWidth: 1920,
      thumbnailHeight: 1080,
      alt: "Palacio",
      caption: "Palacio Nacional"
    }
  ];

  return (
    <div className="images">
      <Title size={1} textAlign="centered" />
      <Gallery
        images={IMAGES}
        enableImageSelection={false}
        backdropClosesModal={true}
        margin={3}
      />
    </div>
  );
};

export default Render;
