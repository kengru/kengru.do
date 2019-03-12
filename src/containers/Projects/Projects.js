import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import * as actions from "../../store/actions";

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
};

class Projects extends Component {
  state = {
    classes: this.props.classes
  };

  componentDidMount() {
    this.props.onFetchMenu();
    this.props.onSetPath();
    this.props.onFetchProjects();
  }

  render() {
    let cards = null;
    if (this.props.projects) {
      cards = this.props.projects.map(project => 
        <Card className={this.state.classes.card}>
          <CardActionArea>
            <CardMedia
              className={this.state.classes.media}
              image={project.image}
              title={project.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {project.name}
              </Typography>
              <Typography component="p">
                {project.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      );
    }
    return (
      <div>
        {cards}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects.projects,
    selectedProject: state.projects.selectedProject
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchMenu: () => dispatch(actions.fetchMenuAsync("projects")),
    onSetPath: () => dispatch(actions.setPathProp("projects")),
    onFetchProjects: () => dispatch(actions.fetchProjectsAsync()),
    onSelectProject: project => dispatch(actions.selectProject(project))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Projects));
