import React, { Component } from "react";
import { Route } from "react-router-dom";
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
          <Route
            path={`${this.props.match.path}/info`}
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
