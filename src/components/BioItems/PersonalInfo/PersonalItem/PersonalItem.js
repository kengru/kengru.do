import React from "react";
import Typography from "@material-ui/core/Typography";

const PersonalItem = props => {
  return (
    <Typography
      variant="display1"
      align="right"
      gutterBottom
      className="focus-data-expand"
    >
      {props.children}
    </Typography>
  );
};

export default PersonalItem;
