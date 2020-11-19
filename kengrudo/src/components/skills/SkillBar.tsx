import React, { useEffect, useState } from "react";

export enum Colors {
  blue = "#3d7ea6"
}

interface Props {
  label: string;
  completedPCT: number;
  color: Colors;
}

export const SkillBar = (props: Props) => {
  const { label, completedPCT, color } = props;
  const [limit, setLimit] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => (limit < completedPCT ? setLimit(limit + completedPCT / 15) : null),
      20
    );

    return () => clearInterval(intervalId);
  }, [limit, completedPCT]);

  const mainStyles = {
    display: "flex",
    width: "400px",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "left" as const
  };

  const labelStyles = {
    width: "200px"
  };

  const parentStyles = {
    height: "1em",
    borderRadius: 50,
    backgroundColor: "#e0e0de",
    width: "100%"
  };

  const fillerStyles = {
    height: "100%",
    width: `${limit}%`,
    backgroundColor: color,
    borderRadius: "inherit",
    transition: "width 200ms linear"
  };

  return (
    <div style={mainStyles}>
      <span style={labelStyles}>{label}</span>
      <div style={parentStyles}>
        <div style={fillerStyles}></div>
      </div>
    </div>
  );
};
