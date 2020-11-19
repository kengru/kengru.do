import React, { useEffect, useState } from "react";

interface Props {
  label: string;
  completedPCT: number;
}

export const SkillBar = (props: Props) => {
  const { label, completedPCT } = props;
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
    margin: "0.3em 0em 0.3em 0em",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "left" as const
  };

  const labelStyles = {
    fontSize: "20px",
    width: "200px"
  };

  const parentStyles = {
    height: "1em",
    borderRadius: 6,
    backgroundColor: "#e0e0de",
    width: "100%"
  };

  const fillerStyles = {
    height: "100%",
    width: `${limit}%`,
    backgroundColor: "#3d7ea6",
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
