import React, { useEffect, useState } from "react";
import { StyleSheet, css } from "aphrodite/no-important";

const styles = StyleSheet.create({
  mainStyles: {
    display: "flex",
    width: "400px",
    margin: "0.3em 0em 0.3em 0em",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "left" as const,
    transition: "width 200ms linear",
    "@media (max-width: 1500px)": {
      width: "280px"
    }
  },
  labelStyles: {
    fontSize: "17px",
    width: "200px",
    "@media (max-width: 1500px)": {
      width: "180px"
    }
  },
  parentStyles: {
    height: "1em",
    borderRadius: 6,
    backgroundColor: "#e0e0de",
    width: "100%"
  }
});

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

  const fillerStyles = {
    height: "100%",
    width: `${limit}%`,
    backgroundColor: "#3d7ea6",
    borderRadius: "inherit",
    transition: "width 200ms linear"
  };

  return (
    <div className={css(styles.mainStyles)}>
      <span className={css(styles.labelStyles)}>{label}</span>
      <div className={css(styles.parentStyles)}>
        <div style={fillerStyles}></div>
      </div>
    </div>
  );
};
