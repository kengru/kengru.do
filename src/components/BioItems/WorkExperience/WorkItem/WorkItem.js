import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

const styles = {
  card: {
    minWidth: 400,
    margin: 20
  },
  title: {
    fontSize: 14
  },
  chip: {
    margin: 7
  }
};

const WorkItem = props => {
  const { classes } = props;
  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {props.item.company}
          </Typography>
          <Typography variant="h5" component="h2">
            Web Developer
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            March 2018 - Present
          </Typography>
          <Typography component="p">
            Developed a series of whatever goes here.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
      </Card>
      <ul>
        <Chip label="ASP.NET Core" color="primary" className={classes.chip}/>
        <Chip label="Vue.js" color="primary" className={classes.chip}/>
        <Chip label="Bootstrap" color="primary" className={classes.chip}/>
      </ul>
    </>
  );
};

export default withStyles(styles)(WorkItem);
