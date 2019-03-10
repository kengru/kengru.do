import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import * as actions from "../../store/actions";
import P5Wrapper from "../../components/P5Wrapper/P5Wrapper";
import Input from "../../components/UI/Input/Input";

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

  shouldComponentUpdate(nextProps) {
    let shouldUpdate = this.state.controls !== nextProps.sketch.controls;
    if (this.state.controls && nextProps.sketch.controls) {
      shouldUpdate = _.difference(
        Object.keys(this.state.controls),
        Object.keys(nextProps.sketch.controls))
    }
    return shouldUpdate;
  }

  componentDidUpdate() {
    if (!this.state.controls) {
      this.setState({ controls: this.props.sketch.controls });
    }
  }

  onSetAppState = (newState, cb) => this.setState(newState, cb);

  inputChangedHandler = (event, inputId) => {
    const updatedControlElement = {
      ...this.state.controls[inputId],
      value: +event.target.value
    };
    const updatedControls = {
      ...this.state.controls,
      [inputId]: updatedControlElement
    };
    this.setState({ controls: updatedControls });
  };

  render() {
    let sketchConfig = null;

    const formElementsArray = [];
    if (this.state.controls) {
      for (let key in this.state.controls) {
        formElementsArray.push({
          id: key,
          config: this.state.controls[key]
        });
      }
      sketchConfig = formElementsArray.map(control => (
        <Input
          key={control.id}
          type={control.config.type}
          label={control.config.label}
          value={control.config.value}
          config={control.config.config}
          changed={event => this.inputChangedHandler(event, control.id)}
        />
      ));
    }
    return (
      <div className="Challenges">
        <Switch>
          <Route
            exact
            key={window.location.href}
            path={`${this.props.match.path}/:id`}
            render={() => (
              <P5Wrapper
                p5Props={{ controls: this.state.controls }}
                onSetAppState={this.onSetAppState}
              />
            )}
          />
          <Redirect exact from="/challenges" to="/challenges/1" />
        </Switch>
        {sketchConfig}
        {/* <p>valor: {this.state.slider}</p>
        <input
          type="range"
          min="40"
          max="120"
          step={1}
          value={this.state.slider}
          onChange={this.onSliderChange}
        />
         */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sketch: state.challenges.sketch
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchMenu: () => dispatch(actions.fetchMenuAsync("challenges")),
    onSetPath: () => dispatch(actions.setPathProp("challenges")),
    onFetchSketch: id => dispatch(actions.fetchSketchAsync(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Challenges);
