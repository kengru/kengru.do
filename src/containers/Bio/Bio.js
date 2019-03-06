import React, { Component } from 'react';

import Typography from "@material-ui/core/Typography";
import Menu from "../../components/Menu/Menu";

import "./Bio.css";

export default class Bio extends Component {
  render() {
    return (
      <div className="Bio">
        <div className="Menu">
          <Menu />
        </div>
        <div className="Info">
          <Typography variant="display1" align="right" gutterBottom>
            Kendry Alexander Grullon
          </Typography>
        </div>
      </div>
    )
  }
}
