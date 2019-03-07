import React, { Component } from "react";
import PropTypes from "prop-types";

import sketch1 from "./sketchs/challenge1";
import sketch2 from "./sketchs/challenge2";

export default class P5Wrapper extends Component {
  static propTypes = {
    p5Props: PropTypes.object.isRequired,
    onSetAppState: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.canvas1 = new window.p5(sketch2, "canvas1-container");
    this.canvas1.props = this.props.p5Props;
    this.canvas1.onSetAppState = this.props.onSetAppState;
  }

  shouldComponentUpdate(nextProps) {
    this.canvas1.props = nextProps.p5Props;
    return false;
  }

  componentWillUnmount() {
    this.canvas1.remove();
  }

  render() {
    return (
      <>
        <div
          id="canvas1-container"
          style={{ width: "100%", textAlign: "center" }}
        />
      </>
    );
  }
}
