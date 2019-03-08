import React from "react";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import "./Education.css";

const education = () => {
  return (
    <div className="BioItem">
      <Typography variant="h4" align="center" gutterBottom>
        Kendry Alexander Grullón
      </Typography>
      <Divider variant="middle" />
      <Typography variant="h6" align="right" gutterBottom className="Data">
        ESTAN DUCACION
      </Typography>
      <Typography variant="h6" align="right" gutterBottom className="Data">
        APRENDIDO
      </Typography>
    </div>
  );
};

export default education;
