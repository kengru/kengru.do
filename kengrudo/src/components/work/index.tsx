import React, { useEffect, useState } from "react";
import { StyleSheet, css } from "aphrodite/no-important";

import { odin } from "../../utils/axios";
import { WorkItem } from "./WorkItem";

const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    margin: "0em 2em 0em 1em",
    justifyContent: "center",
    alignContent: "center",
    fontSize: "calc(3px + 2vmin)"
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
    height: "70%",
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

export const Work: React.FC = () => {
  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      const workItems = await odin.get(`/kengru/work`);
      setItems(workItems.data.data as Item[]);
    };

    fetchItems();
  }, []);

  const workItems = items
    ? items.map((item) => (
        <WorkItem
          key={item.title}
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
      {/* <div className={css(styles.present)}>
        <WorkItem highlighted />
      </div> */}
      <div className={css(styles.workItems)}>{workItems}</div>
    </div>
  );
};
