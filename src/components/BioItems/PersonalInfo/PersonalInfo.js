/*
  Description:
    Component for the presentation of my personal information.
    Including name, residence, age, hobbies, interests, language skills.
*/

import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import "./PersonalInfo.css";

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

const personalInfo = props => {
  const { classes } = props;

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
        <b>age</b>: 24
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
      <Typography className="focus-data-expand" style={{ margin: "20px" }} variant="h4" gutterBottom>
        {" "}
        Technologies
      </Typography>
      <div className="TechCards slide-in-blurred-top">
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              React.js
            </Typography>
            <Typography variant="h5" component="h2">
              be nev lent
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              adjective
            </Typography>
            <Typography component="p">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Sql
            </Typography>
            <Typography variant="h5" component="h2">
              be nev lent
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              adjective
            </Typography>
            <Typography component="p">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default withStyles(styles)(personalInfo);
