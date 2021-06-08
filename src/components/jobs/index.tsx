import React, { useEffect, useState } from "react";
import { StyleSheet, css } from "aphrodite/no-important";

import { odin } from "../../utils/axios";
import { JobItem } from "./JobItem";

const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    flex: 6,
    justifyContent: "center",
    alignContent: "center",
    fontSize: "calc(3px + 2vmin)",
    "@media (max-width: 550px)": {
      overflowY: "scroll",
      margin: 0,
      paddingTop: "4em"
    }
  },
  present: {
    display: "flex",
    marginTop: "2em",
    alignContent: "center",
    justifyContent: "center"
  },
  workItems: {
    display: "flex",
    margin: "auto",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center"
  }
});

interface Item {
  title: string;
  placeOfWork: string;
  skills: string[];
  from: Date;
  to: Date;
  present: boolean;
}

export const Jobs = () => {
  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      const jobItems = await odin.get(`/kengru/works`);
      setItems(jobItems.data.data as Item[]);
    };

    fetchItems();
  }, []);

  const jobItems = items
    ? items.map((item) =>
        !item.present ? (
          <JobItem
            key={item.placeOfWork}
            title={item.title}
            placeOfWork={item.placeOfWork}
            skills={item.skills}
            from={item.from}
            to={item.to}
            highlighted={item.present}
          />
        ) : null
      )
    : null;

  const highlighted = items
    ? items
        .filter((item) => item.present)
        .map((item) => (
          <JobItem
            key={item.placeOfWork}
            title={item.title}
            placeOfWork={item.placeOfWork}
            skills={item.skills}
            from={item.from}
            to={item.to}
            highlighted={item.present}
          />
        ))
    : null;

  return (
    <div className={css(styles.main)}>
      <div className={css(styles.present)}>{highlighted}</div>
      <div className={css(styles.workItems)}>{jobItems}</div>
    </div>
  );
};
