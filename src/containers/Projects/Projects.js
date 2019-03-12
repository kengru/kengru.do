import React, { Component } from 'react';
import { connect } from "react-redux";

import * as actions from "../../store/actions";

class Projects extends Component {
  componentDidMount() {
    this.props.onFetchMenu();
    this.props.onSetPath();
    this.props.onFetchProjects();
  }

  render() {
    return (
      <div>
        {this.props.projects}
      </div>
    )
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
    onSelectProject: (project) => dispatch(actions.selectProject(project))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);