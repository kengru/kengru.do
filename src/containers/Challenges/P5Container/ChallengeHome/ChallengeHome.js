import React from "react";

import Typography from "@material-ui/core/Typography";
import "./ChallengeHome.css";

const ChallengeHome = () => {
  return (
    <div className="Home">
      <Typography align="right" variant="h2">
        The Coding Train Challenges
      </Typography>
      <div className="Paragraph">
        <Typography align="right" variant="h5" paragraph>
          Here is a compilation of challenges created by{" "}
          <a
            style={{ color: "cadetblue" }}
            href="https://www.youtube.com/user/shiffman"
            target="_blank"
            rel="noopener noreferrer"
          >
            Daniel Shiffman
          </a>
          .
        </Typography>
        <Typography align="right" variant="h5" paragraph>
          All of them are done using{" "}
          <a
            href="https://p5js.org/"
            style={{ color: "cadetblue" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            P5js
          </a>
          , a javascript library created to be used by artist, designers,
          educators and beginners.
        </Typography>
      </div>
    </div>
  );
};

export default ChallengeHome;
