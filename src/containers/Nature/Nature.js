import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { Column } from "rbx";
import "rbx/index.css";

import routes from "./routes";
import * as actions from "../../store/actions";
import RouteWithSubs from "../../helpers/routeWithSubs";
import NatureHome from "../../components/NatureItems/NatureHome/NatureHome";
import NatureMenu from "../../components/NatureItems/NatureMenu/NatureMenu";

class Nature extends Component {
  componentDidMount() {
    this.props.onFetchMenu();
  }

  render() {
    return (
      <Column.Group>
        <Column size="one-quarter">
          <NatureMenu menuItems={this.props.menu} />
        </Column>
        <Column>
          <Route exact path="/nature" component={NatureHome} />
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
)(Nature);
