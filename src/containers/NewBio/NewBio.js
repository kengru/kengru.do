import React, { Component } from "react";
import { connect } from "react-redux";
import { Column, Title, Content } from "rbx";
import "rbx/index.css";

import "./NewBio.css";
import * as actions from "../../store/actions";
import WorkCards from "../../components/BioItems/WorkCards/WorkCards";

class Bio extends Component {
  componentDidMount() {
    this.props.onFetchWi();
  }

  render() {
    return (
      <div className="bio">
        <Column size="one-third">
          <Content>
            <Title size={4}>Kendry Alexander Grullón</Title>
            <p>
              A 24 years old programmer from Dominican Republic <br /> asd
            </p>
          </Content>
        </Column>
        <WorkCards workItems={this.props.work}/>
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
