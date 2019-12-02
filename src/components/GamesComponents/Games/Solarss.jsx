import React from "react";
import Unity, { UnityContent } from "react-unity-webgl";

const Solarss = () => {
  const unityContent = new UnityContent(
    `${process.env.PUBLIC_URL}/games/solarss/Solar System Simulation.json`,
    `${process.env.PUBLIC_URL}/games/solarss/UnityLoader.js`
  );

  return (
    <div>
      <Unity unityContent={unityContent} />
    </div>
  );
};

export default Solarss;
