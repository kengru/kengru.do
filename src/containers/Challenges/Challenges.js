import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { fetchMenuAsync, setPathProp, setChallengesMenu } from "../../store/actions/menu";
import P5Wrapper from "../../components/P5Wrapper/P5Wrapper";

import "./Challenges.css";

class Challenges extends Component {
  constructor() {
    super();
    this.state = {
      slider: 100,
      options: []
    };
  }

  componentDidMount() {
    this.props.onFetchMenu();
    this.props.onSetPath();
    this.props.onSetChallenges();
  }

  onSetAppState = (newState, cb) => this.setState(newState, cb);

  onSliderChange = event => {
    this.setState({ slider: +event.target.value });
  };

  render() {
    return (
      <div className="Challenges">
        <Route
          exact
          path={`${this.props.match.path}/`}
          render={() => (
            <P5Wrapper
              p5Props={{ slider: this.state.slider }}
              onSetAppState={this.onSetAppState}
            />
          )}
        />
        {/* <p>valor: {this.state.slider}</p>
        <input
          type="range"
          min="40"
          max="120"
          step={1}
          value={this.state.slider}
          onChange={this.onSliderChange}
        /> */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchMenu: () => dispatch(fetchMenuAsync("challenges")),
    onSetPath: () => dispatch(setPathProp("challenges")),
    onSetChallenges: () => dispatch(setChallengesMenu(true))
  }
}

export default connect(null, mapDispatchToProps)(Challenges);
