import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    minWidth: 230
  },
  title: {
    fontSize: 14
  }
};

const TechCards = props => {
  const { classes } = props;

  return (
    <div className="TechCards slide-in-blurred-top">
      {props.items
        ? props.items.map(item => (
            <Card className={classes.card} key={item.title}>
              <CardContent>
                <Typography variant="h5">{item.title}</Typography>
                <Typography component="p">{item.description}</Typography>
              </CardContent>
            </Card>
          ))
        : null}
    </div>
  );
};

export default withStyles(styles)(TechCards);
