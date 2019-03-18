/*
  Description:
    Component for the presentation of my personal information.
    Including name, residence, age, hobbies, interests, language skills.
*/

import React from "react";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import "./PersonalInfo.css";

const personalInfo = () => {
  return (
    <div className="BioItem">
      <Typography variant="h4" align="center" gutterBottom>
        Kendry Alexander Grullón
      </Typography>
      <Divider variant="middle" />
      <Typography variant="h6" align="right" gutterBottom className="Data">
        Age: 24
      </Typography>
      <Typography variant="h6" align="right" gutterBottom className="Data">
        Email: keng@gmail.com
      </Typography>
    </div>
  );
};

export default personalInfo;