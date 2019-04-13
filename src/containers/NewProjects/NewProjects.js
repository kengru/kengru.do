import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "rbx";
import "rbx/index.css";

import "./NewProjects.css";
import * as actions from "../../store/actions";
import ProjectCards from "../../components/ProjectCards/ProjectCards";

class NewProjects extends Component {
  componentDidMount() {
    this.props.onFetchProjects();
  }

  render() {
    return (
      <React.Fragment>
        <Container fluid>
          <ProjectCards projectItems={this.props.projects} />
        </Container>
      </React.Fragment>
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
)(NewProjects);
