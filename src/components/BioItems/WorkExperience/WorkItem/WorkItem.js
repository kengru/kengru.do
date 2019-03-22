import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

const styles = {
  card: {
    minWidth: 300,
    maxWidth: 450,
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
  let card = null;
  card = props.item ? (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {props.item.company}
          </Typography>
          <Typography variant="h5" component="h2">
            {props.item.position}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {props.item.from} - {props.item.to}
          </Typography>
          <br />
          <Typography component="p">
            {props.item.description}
          </Typography>
        </CardContent>
      </Card>
      <ul>
        {props.item.skills.map(item => (
          <Chip label={item} key={item} color="primary" className={classes.chip} />
        ))}
      </ul>
    </div>
  ) : null;
  return card;
};

export default withStyles(styles)(WorkItem);
