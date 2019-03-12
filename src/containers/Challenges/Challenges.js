import React, { Component } from "react";
import { withRouter } from "react-router";
import { Route } from "react-router-dom";
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
    this.props.onFetchSketch(1);
  }

  shouldComponentUpdate(nextProps) {
    let shouldUpdate = this.state.controls !== nextProps.sketch.controls;
    if (this.state.controls && nextProps.sketch.controls) {
      shouldUpdate = _.difference(
        Object.keys(this.state.controls),
        Object.keys(nextProps.sketch.controls)
      );
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
        {/* <Redirect exact from="/challenges" to="/challenges/1" /> */}
        {sketchConfig}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sketch: state.challenges.sketch,
    path: state.menu.path
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
)(withRouter(Challenges));
