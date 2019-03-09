import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as actions from "../../store/actions";
import sketches from "./sketches";
import Input from "../UI/Input/Input";

class P5Wrapper extends Component {
  state = {
    title: "",
    description: "",
    controls: []
  };

  static propTypes = {
    p5Props: PropTypes.object.isRequired,
    onSetAppState: PropTypes.func.isRequired
  };

  componentDidMount() {
    console.log("[p5wrapper comp did mount]");

    this.canvas1 = new window.p5(
      sketches[this.props.match.params.id - 1],
      "canvas1-container"
    );
    this.props.onFetchSketch(this.props.match.params.id);
    this.canvas1.props = this.props.p5Props;
    this.canvas1.onSetAppState = this.props.onSetAppState;
  }

  shouldComponentUpdate(nextProps) {
    this.canvas1.props = nextProps.p5Props;
    return this.props.sketch !== nextProps.sketch;
  }

  componentWillUnmount() {
    this.canvas1.remove();
  }

  render() {
    let sketchConfig = null;
    
    if (this.props.sketch.controls) {
      sketchConfig = this.props.sketch.controls.map(control => (
        <Input
          key={control.name}
          type={control.type}
          label={control.name}
          value={control.value}
          elementConfig={control.config}
          changed={event => this.inputChanged(event)}
        />
      ));
    }
    return (
      <>
        <h2>{this.props.sketch.title}</h2>
        <p>{this.props.sketch.description}</p>
        <div
          id="canvas1-container"
          style={{ width: "100%", textAlign: "center" }}
        />
        {sketchConfig}
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

export default connect(
  mapStateToProps,
  mapDispatchToState
)(withRouter(P5Wrapper));
