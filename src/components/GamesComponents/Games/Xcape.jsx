import React from "react";
import Unity, { UnityContent } from "react-unity-webgl";

const Xcape = () => {
  const unityContent = new UnityContent(
    `${process.env.PUBLIC_URL}/games/xcape/Xcape.json`,
    `${process.env.PUBLIC_URL}/games/xcape/UnityLoader.js`
  );

  return (
    <div>
      <Unity unityContent={unityContent} />
    </div>
  );
};

export default Xcape;
