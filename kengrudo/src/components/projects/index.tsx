import React, { useEffect, useState } from "react";
import { StyleSheet, css } from "aphrodite/no-important";

import { ProjectItem } from "./ProjectItem";
import { odin } from "../../utils/axios";

const styles = StyleSheet.create({
  main: {
    display: "flex",
    height: "100%",
    width: "100%",
    margin: "0em 2em 0em 1em",
    justifyContent: "center",
    alignContent: "center",
    fontSize: "calc(3px + 2vmin)"
  },
  projectItems: {
    display: "flex",
    margin: "auto",
    height: "80%",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center"
  }
});

interface Item {
  name: string;
  desc: string;
  img: string;
  code: string;
  live: string;
  skills: string[];
}

export const Projects = () => {
  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      const projectItems = await odin.get(`/kengru/projects`);
      setItems(projectItems.data.data as Item[]);
    };

    fetchItems();
  }, []);

  const projectItems = items
    ? items.map((item) => (
        <ProjectItem
          key={item.name}
          name={item.name}
          desc={item.desc}
          img={item.img}
          code={item.code}
          live={item.live}
          skills={item.skills}
        />
      ))
    : null;

  return (
    <div className={css(styles.main)}>
      <div className={css(styles.projectItems)}>{projectItems}</div>
    </div>
  );
};
