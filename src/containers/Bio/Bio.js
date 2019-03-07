import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { fetchMenuSuccess } from "../../store/actions/menu";
import BioItem from "../../components/BioItem/BioItem";

import "./Bio.css";

class Bio extends Component {
  componentDidMount() {
    this.props.onFetchMenu();
  }

  render() {
    return (
      <div className="Bio">
        <div className="Info">
          <Route path={`${this.props.match.path}/info`} component={BioItem}/>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchMenu: () => dispatch(fetchMenuSuccess())
  }
}

export default connect(null, mapDispatchToProps)(Bio);