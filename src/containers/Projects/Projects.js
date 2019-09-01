import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Hero, Column } from "rbx";
import "rbx/index.css";

import "./Projects.css";
import * as actions from "../../store/actions";
import ProjectCards from "../../components/ProjectCards/ProjectCards";

class Projects extends Component {
  componentDidMount() {
    this.props.onFetchProjects();
  }

  render() {
    return (
      <Hero.Body>
        <Container fluid>
          <Column.Group>
            <ProjectCards projectItems={this.props.projects} />
          </Column.Group>
        </Container>
      </Hero.Body>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects.projects
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchProjects: () => dispatch(actions.fetchProjectsAsync())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);
