import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "moment";
import { Column, Title, Content, Hero } from "rbx";
import "rbx/index.css";

import "./Bio.css";
import * as actions from "../../store/actions";
import WorkCards from "../../components/WorkCards/WorkCards";

class Bio extends Component {
  state = {
    age: 0
  };

  componentDidMount() {
    this.props.onFetchWi();
    this.setState({ age: Moment().diff(Moment([1994, 5, 2]), "years") });
  }

  render() {
    return (
      <Hero.Body>
        <div className="bio">
          <Column.Group>
            <Column className="separation" size="one-third">
              <Content>
                <Title size={3}>Kendry Alexander Grullón</Title>
                <p>
                  {this.state.age} years old programmer from Dominican Republic{" "}
                  <br />
                  Trying to do stuffs mainly using <strong>javascript</strong>.
                  <br />I like art and I have developed a thing for 3D Modeling.
                </p>
              </Content>
            </Column>
            <WorkCards workItems={this.props.work} />
          </Column.Group>
        </div>
      </Hero.Body>
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
