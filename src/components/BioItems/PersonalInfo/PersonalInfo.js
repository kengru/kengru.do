/*
  Description:
    Component for the presentation of my personal information.
    Including name, residence, age, hobbies, interests, language skills.
*/

import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "moment";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import * as actions from "../../../store/actions/";
import PersonalItem from "./PersonalItem/PersonalItem";
import TechCards from "./TechCards/TechCards";
import "./PersonalInfo.css";

class PersonalInfo extends Component {
  state = {
    age: 0
  };

  componentDidMount() {
    this.props.onFetchPi();
    this.setState({ age: Moment().diff(Moment([1994, 5, 2]), "years") });
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
          Kendry Alexander Grullón
        </Typography>
        <Divider variant="middle" />
        <PersonalItem>
          <b>Age</b>: {this.state.age}
        </PersonalItem>
        <PersonalItem>
          <b>Email</b>: kengrullon@gmail.com
        </PersonalItem>
        <PersonalItem>
          <b>Number</b>: 1-809-729-5448
        </PersonalItem>
        <PersonalItem>
          <a
            style={{ color: "cadetblue" }}
            href="https://github.com/kengru"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </PersonalItem>
        <PersonalItem>
          <a
            style={{ color: "cadetblue" }}
            href="https://twitter.com/kxngru"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </PersonalItem>
        <PersonalItem>
          <a
            style={{ color: "cadetblue" }}
            href="https://medium.com/@kengru"
            target="_blank"
            rel="noopener noreferrer"
          >
            Medium
          </a>
        </PersonalItem>
        <Divider variant="middle" />
        <Typography
          className="focus-data-expand"
          style={{ margin: "20px" }}
          variant="h4"
          align="left"
          gutterBottom
        >
          {" "}
          Web Skills
        </Typography>
        <TechCards items={this.props.personal} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    personal: state.bio.personal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchPi: () => dispatch(actions.fetchPersonalAsync())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInfo);
