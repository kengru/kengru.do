import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { Column } from "rbx";
import "rbx/index.css";

import routes from "./routes";
import * as actions from "../../store/actions";
import RouteWithSubs from "../../helpers/routeWithSubs";
import ChallengeHome from "../../components/ChallengesItems/ChallengeHome/ChallengeHome";
import ChallengeMenu from "../../components/ChallengesItems/ChallengeMenu/ChallengeMenu";

class Challenges extends Component {
  componentDidMount() {
    this.props.onFetchMenu();
  }

  render() {
    return (
      <Column.Group>
        <Column size="one-quarter">
          <ChallengeMenu menuItems={this.props.menu} />
        </Column>
        <Column>
          <Route exact path="/challenges" component={ChallengeHome} />
          {routes.map((route, i) => (
            <RouteWithSubs key={i} {...route} />
          ))}
        </Column>
      </Column.Group>
    );
  }
}

const mapStateToProps = state => {
  return {
    menu: state.challenges.menuItems
  };
};

const mapDispatchToState = dispatch => {
  return {
    onFetchMenu: id => dispatch(actions.fetchMenuAsync())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToState
)(Challenges);
