import { useEffect, useState } from "react";
import { ProjectItem } from "./ProjectItem";
import { odin } from "../utils/axios";

import type { TProject, OdinResponse } from "../typings";

export const Projects = () => {
  const [items, setItems] = useState<TProject[] | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      const projectItems = await odin.get<OdinResponse<TProject[]>>(
        `/kengru/projects`
      );
      setItems(projectItems.data.results);
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

  return <div className="sm:m-auto">{projectItems}</div>;
};
