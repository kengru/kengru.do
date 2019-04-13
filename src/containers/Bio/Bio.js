import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "moment";
import { Column, Title, Content } from "rbx";
import "rbx/index.css";

import "./Bio.css";
import * as actions from "../../store/actions";
import WorkCards from "../../components/WorkCards/WorkCards";

class Bio extends Component {
  state = {
    age: 0
  }
  
  componentDidMount() {
    this.props.onFetchWi();
    this.setState({ age: Moment().diff(Moment([1994, 5, 2]), "years") });
  }

  render() {
    return (
      <div className="bio">
        <Column className="separation" size="one-third">
          <Content>
            <Title size={3}>Kendry Alexander Grullón</Title>
            <p>
              {this.state.age} years old programmer from Dominican Republic <br />
              Trying to do stuffs mainly in <strong>javascript</strong> <br />
            </p>
          </Content>
        </Column>
        <WorkCards workItems={this.props.work} />
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
    onFetchWi: () => dispatch(actions.fetchWorkAsync())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bio);
