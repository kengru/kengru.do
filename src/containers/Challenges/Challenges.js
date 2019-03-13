import React, { Component } from "react";
import { withRouter } from "react-router";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import P5Container from "./P5Container/P5Container";

import "./Challenges.css";

class Challenges extends Component {
  componentDidMount() {
    this.props.onFetchMenu();
    this.props.onSetPath();
  }

  render() {
    return (
      <div className="Challenges">
        <Route path="/challenges" component={P5Container} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchMenu: () => dispatch(actions.fetchMenuAsync("challenges")),
    onSetPath: () => dispatch(actions.setPathProp("challenges"))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Challenges));
