import React from "react";
import { Title, Section } from "rbx";
import "rbx/index.css";

import "./NatureHome.css";

const NatureHome = () => {
  return (
    <div className="Home focus-in-expand">
      <Title size={2} textAlign="centered">
        Nature of Code
      </Title>
      <Section>
        <Title subtitle size={4}>
          Here is my attempt to represent a creature and it's environment using
          the book{" "}
          <a
            style={{ color: "cadetblue" }}
            href="https://natureofcode.com/ "
            target="_blank"
            rel="noopener noreferrer"
          >
            The Nature of Code
          </a>
          &nbsp;authored by{" "}
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
          This attempt comes from my mere fascination of implementing real life
          physics in code, in here, I'll try to implement a environment I have
          in mind, which I hope it involves Jellyfishes. I'll be using{" "}
          <a
            href="https://p5js.org/"
            style={{ color: "cadetblue" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            P5js
          </a>
          , a javascript library created to be used by artist, designers,
          educators and beginners. And Maybe one or two helper libraries.
        </Title>
        <Title subtitle size={4}>
          As with the challenges, I'll try to have some controls on the sketches
          so you can modify variables and achieve different results with the
          environment.
        </Title>
      </Section>
    </div>
  );
};

export default NatureHome;
