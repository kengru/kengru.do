import React, { Component } from 'react';
import { Route } from "react-router-dom";

import Menu from "../../components/Menu/Menu";
import BioItem from "../../components/BioItem/BioItem";

import "./Bio.css";

export default class Bio extends Component {
  render() {
    return (
      <div className="Bio">
        <div className="Menu">
          <Menu {...this.props}/>
        </div>
        <div className="Info">
          <Route path={`${this.props.match.path}/info`} component={BioItem}/>
        </div>
      </div>
    )
  }
}