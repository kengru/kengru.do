import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
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
    console.log("[challenges comp did mount]");
  }

  onSetAppState = (newState, cb) => this.setState(newState, cb);

  onSliderChange = event => {
    this.setState({ slider: +event.target.value });
  };

  render() {
    return (
      <div className="Challenges">
        <Switch>
          <Route
            exact
            key={window.location.href}
            path={`${this.props.match.path}/:id`}
            render={() => (
              <P5Wrapper
                p5Props={{ slider: this.state.slider }}
                onSetAppState={this.onSetAppState}
              />
            )}
          />
          <Redirect exact from="/challenges" to="/challenges/1" />
        </Switch>
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
    onFetchMenu: () => dispatch(actions.fetchMenuAsync("challenges")),
    onSetPath: () => dispatch(actions.setPathProp("challenges")),
    onFetchSketch: id => dispatch(actions.fetchSketchAsync(id))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Challenges);
