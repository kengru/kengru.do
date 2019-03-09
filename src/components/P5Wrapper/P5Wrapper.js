import React, { Component } from "react";
import { withRouter } from "react-router";

import PropTypes from "prop-types";

import sketches from "./sketches";

class P5Wrapper extends Component {
  static propTypes = {
    p5Props: PropTypes.object.isRequired,
    onSetAppState: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.canvas1 = new window.p5(sketches[this.props.match.params.id - 1], "canvas1-container");
    this.canvas1.props = this.props.p5Props;
    this.canvas1.onSetAppState = this.props.onSetAppState;
    console.log(this.props);
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

export default withRouter(P5Wrapper);