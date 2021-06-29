import { useCallback, useState } from "react";

import { useLanguage } from "../context/language";
import { enResources } from "../resources/resources";
import { esResources } from "../resources/resources-es";

type Languages = "EN" | "ES";

export const ToggleLang = () => {
  const { setResources } = useLanguage();
  const [language, setLanguage] = useState<Languages>("EN");

  const onToggle = useCallback(() => {
    if (language === "EN") {
      setLanguage("ES");
      setResources(esResources);
    } else {
      setLanguage("EN");
      setResources(enResources);
    }
  }, [language, setResources]);

  return (
    <div
      className="hidden absolute sm:flex left-6 top-5 items-center"
      onClick={onToggle}
    >
      <div className="bg-gray-100 border-2 border-indigo-100 rounded-3xl h-8 w-14">
        <div
          className={`rounded-full h-6 w-6 relative left-0.5 top-0.5 transition-transform ${
            language === "EN"
              ? "bg-indigo-600 transform translate-x-0"
              : "bg-green-600 transform translate-x-6"
          }`}
        ></div>
      </div>
      <span className="ml-4 font-bold">{language}</span>
    </div>
  );
};
