import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { fetchMenuAsync, setPathProp } from "../../store/actions/menu";
import PersonalInfo from "../../components/BioItems/PersonalInfo/PersonalInfo";
import WorkExperience from "../../components/BioItems/WorkExperience/WorkExperience";
import Education from "../../components/BioItems/Education/Education";

import "./Bio.css";

class Bio extends Component {
  componentDidMount() {
    this.props.onFetchMenu();
    this.props.onSetPath();
  }

  render() {
    return (
      <div className="Bio">
        <div className="Info">
          <Switch>
            <Route
              exact
              path={`${this.props.match.path}/`}
              component={PersonalInfo}
            />
            <Route
              path={`${this.props.match.path}/work`}
              component={WorkExperience}
            />
            <Route
              path={`${this.props.match.path}/education`}
              component={Education}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchMenu: () => dispatch(fetchMenuAsync("bio")),
    onSetPath: () => dispatch(setPathProp("bio"))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Bio);
