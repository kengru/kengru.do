/* 
  Description:
    example wrapper for p5js, containing nature components.
*/

import React, { Component } from "react";
import { withRouter } from "react-router";
import { Title, Field } from "rbx";
import "rbx/index.css";

import "../sketch.css";

import sketches from "../sketches";

import Input from "../../../UI/Input/Input";

class P5Wrapper extends Component {
  state = {
    title: "",
    description: "",
    controls: {
      speed: {
        config: {
          max: 50,
          min: 1,
          step: 1
        },
        type: "range",
        label: "Speed",
        value: 1
      }
    }
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
    this.canvas1 = new window.p5(sketches[0], "canvas1-container");
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
      <Field key={control.id} style={{ paddingRight: "1em" }}>
        <Input
          type={control.config.type}
          label={control.config.label}
          value={control.config.value}
          config={control.config.config}
          changed={event => this.inputChangedHandler(event, control.id)}
        />
      </Field>
    ));

    return (
      <div className="Sketch">
        <Title size="3" align="center">
          Introduction
        </Title>
        <Title subtitle align="center" size="6">
          Description
        </Title>
        <div
          id="canvas1-container"
          style={{ width: "100%", textAlign: "center" }}
        />
        <Field kind="group" multiline>
          {sketchConfig}
        </Field>
      </div>
    );
  }
}

export default withRouter(P5Wrapper);
