import React from "react";
import { Title, Section } from "rbx";
import "rbx/index.css";

import "./ChallengeHome.css";

const ChallengeHome = () => {
  return (
    <div className="Home focus-in-expand">
      <Title size={2}>The Coding Train Challenges</Title>
      <Section>
        <Title subtitle size={4}>
          Here is a compilation of challenges created by{" "}
          <a
            style={{ color: "cadetblue" }}
            href="https://www.youtube.com/user/shiffman"
            target="_blank"
            rel="noopener noreferrer"
          >
            Daniel Shiffman
          </a>
          &nbsp;and coded by me.
        </Title>
        <Title subtitle size={4}>
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
        </Title>
        <Title subtitle size={4}>
          I'll try to have some controls the sketches so you can modify
          variables and achieve different results.
        </Title>
        <Title subtitle size={4}>
          Source Code for the challenges:{" "}
          <a
            href="https://github.com/kengru/CTChallenges"
            style={{ color: "cadetblue" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Challenges
          </a>
        </Title>
      </Section>
    </div>
  );
};

export default ChallengeHome;
