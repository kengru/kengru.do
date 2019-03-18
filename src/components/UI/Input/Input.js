/*
  Description:
    Creates an input depending of the type passed to the component.
  Props:
    type: the type of the input, used in the switch and the input.
    config: holds the configuration depending of the type of input.
    value: the initial value it's going to take.
    onChange: function which changes the value of the input and 
      handles the state changes of the parent.
*/
import React from "react";
import Typography from "@material-ui/core/Typography";
import "./Input.css";

const input = props => {
  let inputElement = null;

  switch (props.type) {
    case "range":
      inputElement = (
        <input
          {...props.config}
          type={props.type}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    default:
      break;
  }

  return (
    <div className="Control">
      <Typography variant="subtitle1">{props.label}</Typography>
      {inputElement}
    </div>
  );
};

export default input;
