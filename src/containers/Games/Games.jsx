import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Hero } from "rbx";

import GameMenu from "../../components/GamesComponents/GamesMenu/GamesMenu";

import * as actions from "../../store/actions";
import RouteWithSubs from "../../helpers/routeWithSubs";
import routes from "../../components/GamesComponents/routes";

import "./Games.css";

class Games extends Component {
  componentDidMount() {
    this.props.onFetchGames();
  }

  render() {
    return (
      <Hero.Body className="gameBody">
        <Switch>
          <Route
            exact
            path="/games"
            render={() => <GameMenu games={this.props.games} />}
          />
          {routes.map((route, i) => (
            <RouteWithSubs key={i} {...route} />
          ))}
        </Switch>
      </Hero.Body>
    );
  }
}

const mapStateToProps = state => {
  return {
    games: state.games.games
  };
};

const mapDispatchToState = dispatch => {
  return {
    onFetchGames: id => dispatch(actions.fetchGamesAsync())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToState
)(Games);
