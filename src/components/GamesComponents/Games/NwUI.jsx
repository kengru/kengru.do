import React from "react";
import Unity, { UnityContent } from "react-unity-webgl";

const NwUI = () => {
  const unityContent = new UnityContent(
    `${process.env.PUBLIC_URL}/games/nwui/Number Wizard UI.json`,
    `${process.env.PUBLIC_URL}/games/nwui/UnityLoader.js`
  );

  return (
    <div>
      <Unity unityContent={unityContent} />
    </div>
  );
};

export default NwUI;
