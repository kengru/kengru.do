import React from "react";
import { Player } from "video-react";

import "../../../node_modules/video-react/dist/video-react.css";
import "./Renders.css";

const Renders = () => {
  const videos = [
    "https://firebasestorage.googleapis.com/v0/b/kengru-do.appspot.com/o/videos_kengru%2Fv3videoskin.mp4?alt=media&token=a1d456b2-431a-41a6-ad23-6717d81f12dd",
    "https://firebasestorage.googleapis.com/v0/b/kengru-do.appspot.com/o/videos_kengru%2F0001-0300.mp4?alt=media&token=4941838a-8aa9-40aa-b3a7-7f8b67662775",
    "https://firebasestorage.googleapis.com/v0/b/kengru-do.appspot.com/o/videos_kengru%2FRocketLaunch0001-0250.mp4?alt=media&token=b401f615-6879-47da-95ce-e719a5875392",
    "https://firebasestorage.googleapis.com/v0/b/kengru-do.appspot.com/o/videos_kengru%2F0001-0120.mp4?alt=media&token=50448458-2066-4864-b565-f7cc83f8c4b0"
  ].map((src, idx) => {
    return (
      <div key={idx} className="individual">
        <Player playsInline src={src} aspectRatio="auto" />
      </div>
    );
  });

  return <div className="images">{videos}</div>;
};

export default Renders;
