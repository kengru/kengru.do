import { useEffect, useState } from "react";
import { ProjectItem } from "./ProjectItem";
import { odin } from "../utils/axios";

import type { AxiosResponse } from "axios";
import type { TProject } from "../typings";

const mockedItems: TProject[] = [
  {
    img: "https://firebasestorage.googleapis.com/v0/b/kengru-do.appspot.com/o/images%2Fphoto_2019-03-11_23-00-29.jpg?alt=media&token=ff774397-92ca-410f-9696-7db67d010c4d",
    name: "Giru",
    desc: "A telegram bot just for fun.",
    code: "https://github.com/kengru/Giru",
    live: "",
    skills: ["python", "telegram-bot"]
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/kengru-do.appspot.com/o/images%2Fminesweeper%20(1).png?alt=media&token=431c6d02-8aef-46d6-b029-e09dc50a9b3b",
    name: "Minesweeper",
    desc: "Minesweeper game made with React.",
    code: "https://github.com/kengru/minesweeper",
    live: "https://kg-minesweeper.netlify.app/",
    skills: ["react", "typescript"]
  }
];

export const Projects = () => {
  const [items, setItems] = useState<TProject[] | null>(mockedItems);

  useEffect(() => {
    const fetchItems = async () => {
      const projectItems = await odin.get<AxiosResponse<TProject[]>>(
        `/kengru/projects`
      );
      // setItems(projectItems.data.data);
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

  return <div className="m-auto">{projectItems}</div>;
};
