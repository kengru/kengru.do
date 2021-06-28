import { useLanguage } from "../../context/language";
import type { TProject } from "../../typings";

export const ProjectItem = ({
  name,
  desc,
  img,
  code,
  live,
  skills
}: TProject) => {
  const { resources } = useLanguage();
  const showCode = code !== "";
  const showLive = live !== "";

  return (
    <div className="flex bg-white rounded-xl mb-6 border border-gray-300 m-4 md:m-6">
      <div className="flex-none w-40 relative">
        <img
          src={img}
          alt={name}
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
      <div className="flex-auto p-4">
        <div className="flex flex-wrap">
          <h1 className="flex-auto text-xl font-semibold">{name}</h1>
          <div className="w-full flex-none text-sm font-medium text-gray-500">
            {desc}
          </div>
        </div>
        <div className="flex items-baseline mt-2 mb-4">
          <ul className="space-x-6 flex">
            {skills.map((skill) => (
              <li className="text-sm w-15 h-9 flex items-center text-gray-600">
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex space-x-3 mb-4 mt-4 text-sm font-medium">
          <div className="flex space-x-10">
            {showCode ? (
              <a
                className="w-20 h-10 flex items-center justify-center rounded-md bg-black text-white"
                href={code}
                target="_blank"
                rel="noreferrer noopener"
              >
                {resources.Source}
              </a>
            ) : null}
            {showLive ? (
              <a
                className="w-20 h-10 flex items-center justify-center rounded-md bg-black text-white"
                href={live}
                target="_blank"
                rel="noreferrer noopener"
              >
                {resources.Live}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
