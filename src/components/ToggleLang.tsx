import { useCallback, useState } from "react";
import { StyleSheet, css } from "aphrodite/no-important";

import { useLanguage } from "../context/language";
import { enResources } from "../resources/resources";
import { esResources } from "../resources/resources-es";

type Languages = "English" | "Español";

const styles = StyleSheet.create({
  container: {
    fontSize: "calc(8px + 1vmin)",
    marginTop: "20px"
  },
  language: {},
  toggle: {
    height: "30px",
    width: "60px",
    border: "1px solid black",
    borderRadius: "20px"
  }
});

export const ToggleLang = () => {
  const { setResources } = useLanguage();
  const [language, setLanguage] = useState<Languages>("English");

  const onToggle = useCallback(() => {
    if (language === "English") {
      setLanguage("Español");
      setResources(esResources);
    } else {
      setLanguage("English");
      setResources(enResources);
    }
  }, [language, setResources]);

  return (
    <div className={css(styles.container)} onClick={onToggle}>
      <div className={css(styles.toggle)}></div>
      <span className={css(styles.language)}>{language}</span>
    </div>
  );
};
