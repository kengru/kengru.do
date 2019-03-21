import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    minWidth: 150,
    margin: 20
  },
  title: {
    fontSize: 14
  }
};

const TechCards = props => {
  const { classes } = props;

  return (
    <div className="TechCards slide-in-blurred-top">
      {props.items.skills
        ? props.items.skills.map(item => (
            <Card className={classes.card} key={item}>
              <CardContent>
                <Typography variant="subtitle1">{item}</Typography>
              </CardContent>
            </Card>
          ))
        : null}
    </div>
  );
};

export default withStyles(styles)(TechCards);
