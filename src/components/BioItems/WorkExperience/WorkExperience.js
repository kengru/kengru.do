/*
  Description:
    Component for the presentation of the places I've worked. 
*/

import React from "react";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import WorkItem from "./WorkItem/WorkItem";
import "./WorkExperience.css";

const workExperience = () => {
  return (
    <div className="BioItem">
      <Typography
        variant="h3"
        align="right"
        className="focus-in-expand"
        gutterBottom
      >
        Work Experience
      </Typography>
      <Divider variant="middle" />
      <div className="WorkItems">
        <WorkItem />
      </div>
    </div>
  );
};

export default workExperience;
