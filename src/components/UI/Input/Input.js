import React from "react";

const input = props => {
  let inputElement = null;

  switch (props.type) {
    case "range":
      inputElement = (
        <input
          {...props.elementConfig}
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
    <>
      <label>{props.label}</label>
      {inputElement}
    </>
  );
};

export default input;
