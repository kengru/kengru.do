/*
  Description:
    Component for the presentation of my personal information.
    Including name, residence, age, hobbies, interests, language skills.
*/

import React from "react";
import Moment from "moment";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import TechCards from "./TechCards/TechCards";
import "./PersonalInfo.css";

const personalInfo = props => {
  const techItems = [
    {
      title: "React.js",
      description: "1 year of work experience"
    },
    {
      title: "Node.js",
      description: "2 years of work experience"
    },
    {
      title: "Python",
      description: "4 years of work experience"
    }
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
      <Typography
        variant="display1"
        align="right"
        gutterBottom
        className="Data focus-data-expand"
      >
        <b>age</b>: {age}
      </Typography>
      <Typography
        variant="display1"
        align="right"
        gutterBottom
        className="Data focus-data-expand"
      >
        <b>email</b>: kengrullon@gmail.com
      </Typography>
      <Typography
        variant="display1"
        align="right"
        gutterBottom
        className="Data focus-data-expand"
      >
        <b>number</b>: 1-809-729-5448
      </Typography>
      <Divider variant="middle" />
      <Typography
        className="focus-data-expand"
        style={{ margin: "20px" }}
        variant="h4"
        gutterBottom
      >
        {" "}
        Technologies
      </Typography>
      <TechCards items={techItems} />
    </div>
  );
};

export default personalInfo;
