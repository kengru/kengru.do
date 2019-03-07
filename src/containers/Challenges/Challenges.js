import React, { Component } from "react";
import { Route } from "react-router-dom";

import P5Wrapper from "../../components/P5Wrapper/P5Wrapper";

class Challenges extends Component {
  constructor() {
    super();
    this.state = {
      slider: 100
    };
  }

  onSetAppState = (newState, cb) => this.setState(newState, cb);

  onSliderChange = (event) => {
    this.setState({ slider: +event.target.value });
  }

  render() {
    return (
      <div>
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
        <p>valor: {this.state.slider}</p>
        <input
          type="range"
          min="40"
          max="120"
          step={1}
          value={this.state.slider}
          onChange={this.onSliderChange}
        />
      </div>
    );
  }
}

export default Challenges;
