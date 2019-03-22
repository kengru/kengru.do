/*
  Description:
    Component for the presentation of the places I've worked. 
*/

import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import WorkItem from "./WorkItem/WorkItem";
import "./WorkExperience.css";

class WorkExperience extends Component {
  componentDidMount() {
    this.props.onFetchWe();
  }

  render() {
    return (
      <div className="BioItem">
        <Typography
          variant="h3"
          align="right"
          className="focus-in-expand"
          gutterBottom
        >
          Work Experience
        </Typography>
        <Divider variant="middle" />
        <div className="WorkItems slide-in-blurred-top">
          {this.props.work
            ? this.props.work.map(item => <WorkItem key={item.company} item={item} />)
            : null}
          <WorkItem />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    work: state.bio.work
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchWe: () => dispatch(actions.fetchWorkAsync())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkExperience);
