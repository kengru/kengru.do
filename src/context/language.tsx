import React, { createContext, useContext, useState } from "react";

import { LocaleResource } from "../resources";
import { enResources } from "../resources/resources";

type ContextValue = {
  resources: LocaleResource;
  setResources: React.Dispatch<React.SetStateAction<LocaleResource>>;
};

const LanguageContext = createContext<ContextValue | undefined>(undefined);

const LanguageProvider: React.FC = ({ children }) => {
  const [resources, setResources] = useState<LocaleResource>(enResources);

  const value = { resources, setResources };
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export { LanguageProvider, useLanguage };
