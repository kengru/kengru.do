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
          max: 1,
          min: 0,
          step: 0.2
        },
        type: "range",
        label: "Speed",
        value: 0.2
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
    this.canvas1 = new window.p5(sketches[0], "compareMov-container");
    this.canvas1.props = this.state.controls;
    this.canvas1.onSetAppState = this.onSetAppState;
    this.canvas2 = new window.p5(sketches[1], "perlin-container");
    this.canvas2.props = this.state.controls;
    this.canvas2.onSetAppState = this.onSetAppState;
    this.canvas3 = new window.p5(sketches[2], "fog-container");
    this.canvas3.props = this.state.controls;
    this.canvas3.onSetAppState = this.onSetAppState;
    this.canvas4 = new window.p5(sketches[3], "terrain-container");
    this.canvas4.props = this.state.controls;
    this.canvas4.onSetAppState = this.onSetAppState;
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
      <div className="FullDiv">
        <Title size="3" align="center">
          Introduction
        </Title>
        <p>
          On this first sketch, it's showed the difference between an individual
          moving at random unrelated steps (the blue circle) and using{" "}
          <a
            style={{ color: "cadetblue" }}
            href="https://en.wikipedia.org/wiki/Perlin_noise"
            target="_blank"
            rel="noopener noreferrer"
          >
            Perlin Noise
          </a>{" "}
          (the black circle) to map it's location on a 2D plane.
        </p>
        <div className="Sketch">
          <Field kind="group" multiline>
            {sketchConfig[0]}
          </Field>
          <div id="compareMov-container" style={{ textAlign: "center" }} />
        </div>
        <p>
          As you can see, the blue circle moves in very little steps (2px at
          each frame to be precise) and it's movement does not look very
          natural.
        </p>
        <p>
          Perlin Noise it's useful to get random continuous numbers between 0
          and 1 that are somewhat related to each other. It's done by passing up
          a number and increasing the value by every iteration. Here you can see
          the input to the noise function and it's output.
        </p>
        <div className="Sketch">
          <div id="perlin-container" style={{ textAlign: "center" }} />
        </div>
        <p>
          Other two applications could be to represent some kind of fog in 2D,
          since every pixel brightness is related to it's neighbour.
        </p>
        <div className="Sketch">
          <div id="fog-container" style={{ textAlign: "center" }} />
        </div>
        <p>
          As well as represent a terrain in 3D by adding a Z value to the perlin
          algorithm.
        </p>
        <div className="Sketch">
          <div id="terrain-container" style={{ textAlign: "center" }} />
        </div>
        <p style={{ marginBottom: "1em" }}>
          In conclusion, perlin noise it's a smooth way to represent randomness
          that makes a little bit of sense. It has many applications but could
          be a mistake to use in every kind of movement, as there are many
          things that could benefit from a real random function. Next stop,{" "}
          <b>Vectors</b>.
        </p>
      </div>
    );
  }
}

export default withRouter(P5Wrapper);
