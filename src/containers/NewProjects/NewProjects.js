import React, { Component } from "react";
import { connect } from "react-redux";
import { Title, Container } from "rbx";
import "rbx/index.css";

import * as actions from "../../store/actions";
import "./NewProjects.css";

class NewProjects extends Component {
  componentDidMount() {
    this.props.onFetchProjects();
  }

  render() {
    console.log(this.props.projects);
    return (
      <React.Fragment>
        <Container fluid>
          <Title size={2}>Projects</Title>
        </Container>
        <Container fluid>
          
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
