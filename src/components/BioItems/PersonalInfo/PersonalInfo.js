/*
  Description:
    Component for the presentation of my personal information.
    Including name, residence, age, hobbies, interests, language skills.
*/

import React from "react";
import Moment from "moment";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import PersonalItem from "./PersonalItem/PersonalItem";
import TechCards from "./TechCards/TechCards";
import "./PersonalInfo.css";

const personalInfo = props => {
  const techItems = [
    "React.js",
    "Redux",
    "Node.js",
    "Python",
    "Django",
    "SQL & NoSQL"
  ];

  let age = Moment();
  age = age.diff(Moment([1994, 5, 2]), "years");

  return (
    <div className="BioItem">
      <Typography
        variant="h3"
        align="right"
        className="focus-in-expand"
        gutterBottom
      >
        Kendry Alexander Grullón
      </Typography>
      <Divider variant="middle" />
      <PersonalItem>
        <b>age</b>: {age}
      </PersonalItem>
      <PersonalItem>
        <b>email</b>: kengrullon@gmail.com
      </PersonalItem>
      <PersonalItem>
        <b>number</b>: 1-809-729-5448
      </PersonalItem>
      <PersonalItem>
        <a
          style={{ color: "cadetblue" }}
          href="https://github.com/kengru"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </PersonalItem>
      <PersonalItem>
        <a
          style={{ color: "cadetblue" }}
          href="https://twitter.com/kxngru"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
      </PersonalItem>
      <PersonalItem>
        <a
          style={{ color: "cadetblue" }}
          href="https://medium.com/@kengru"
          target="_blank"
          rel="noopener noreferrer"
        >
          Medium
        </a>
      </PersonalItem>
      <Divider variant="middle" />
      <Typography
        className="focus-data-expand"
        style={{ margin: "20px" }}
        variant="h4"
        align="left"
        gutterBottom
      >
        {" "}
        Web Skills
      </Typography>
      <TechCards items={techItems} />
    </div>
  );
};

export default personalInfo;
