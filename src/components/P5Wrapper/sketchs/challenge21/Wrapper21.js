import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Title } from "rbx";
import "rbx/index.css";

import "../Challenge.css";

import * as actions from "../../../../store/actions";
import sketches from "../../sketches";

import Input from "../../../UI/Input/Input";

class P5Wrapper extends Component {
  state = {
    title: "",
    description: "",
    controls: {}
  };

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

  onSetAppState = (newState, cb) => this.setState(newState, cb);

  componentDidMount() {
    this.canvas1 = new window.p5(sketches[20], "canvas1-container");
    this.props.onFetchSketch(21);
    this.canvas1.props = this.state.controls;
    this.canvas1.onSetAppState = this.onSetAppState;
  }

  componentDidUpdate() {
    this.canvas1.props = this.state.controls;
  }

  componentWillUnmount() {
    this.canvas1.remove();
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    const sketchConfig = formElementsArray.map(control => (
      <Input
        key={control.id}
        type={control.config.type}
        label={control.config.label}
        value={control.config.value}
        config={control.config.config}
        changed={event => this.inputChangedHandler(event, control.id)}
      />
    ));

    return (
      <div className="FullDiv">
        <Title size="3" align="center">
          {this.props.sketch.title}
        </Title>
        <Title subtitle align="center" size="6">
          {this.props.sketch.description}
        </Title>
        <div
          id="canvas1-container"
          style={{ width: "100%", textAlign: "center" }}
        />
        <div className="Controls">{sketchConfig}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sketch: state.challenges.sketch
  };
};

const mapDispatchToState = dispatch => {
  return {
    onFetchSketch: id => dispatch(actions.fetchSketchAsync(id))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToState
  )(P5Wrapper)
);
