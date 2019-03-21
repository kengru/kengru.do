import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import PersonalInfo from "../../components/BioItems/PersonalInfo/PersonalInfo";
import WorkExperience from "../../components/BioItems/WorkExperience/WorkExperience";
import Education from "../../components/BioItems/Education/Education";

import "./Bio.css";

class Bio extends Component {
  componentDidMount() {
    this.props.onFetchMenu();
    this.props.onSetPath();
    this.props.onFetchWe();
    this.props.onFetchEd();
  }

  render() {
    return (
      <div className="Bio">
        <div className="Info">
          <Switch>
            <Route
              exact
              path={`${this.props.match.path}/`}
              render={() => <PersonalInfo items={this.props.personal} />}
            />
            <Route
              path={`${this.props.match.path}/work`}
              render={() => <WorkExperience items={this.props.work} />}
            />
            <Route
              path={`${this.props.match.path}/education`}
              render={() => <Education items={this.props.education} />}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    personal: state.bio.personal,
    work: state.bio.work,
    education: state.bio.education
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchMenu: () => dispatch(actions.fetchMenuAsync("bio")),
    onSetPath: () => dispatch(actions.setPathProp("bio")),
    onFetchWe: () => dispatch(actions.fetchWorkAsync()),
    onFetchEd: () => dispatch(actions.fetchEducationAsync())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bio);
