import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as actions from "../../../../store/actions";
import sketches from "../../sketches";

class P5Wrapper extends Component {
  state = {
    title: "",
    description: "",
    controls: {
      size: {
        value: 40
      }
    }
  };

  static propTypes = {
    p5Props: PropTypes.object.isRequired,
    onSetAppState: PropTypes.func.isRequired
  };

  onSetAppState = (newState, cb) => this.setState(newState, cb);

  componentDidMount() {
    this.canvas1 = new window.p5(
      sketches[0],
      "canvas1-container"
    );
    this.props.onFetchSketch(1);
    console.log("[comp did mount]", this.state.controls);
    this.canvas1.props = this.state.controls;
    this.canvas1.onSetAppState = this.onSetAppState;
  }

  shouldComponentUpdate(nextProps) {
    this.canvas1.props = nextProps.p5Props;
    return this.props.sketch.controls !== nextProps.sketch.controls;
  }

  componentDidUpdate () {
    this.setState({ controls: this.props.sketch.controls });
  }

  componentWillUnmount() {
    this.canvas1.remove();
  }
  render() {
    return (
      <>
        HEY WRAP1
        <h2>{this.props.sketch.title}</h2>
        <p>{this.props.sketch.description}</p>
        <div
          id="canvas1-container"
          style={{ width: "100%", textAlign: "center" }}
        />
      </>
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToState
)(P5Wrapper));
