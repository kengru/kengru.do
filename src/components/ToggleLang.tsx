import { useCallback, useState } from "react";
import { StyleSheet, css } from "aphrodite/no-important";

import { useLanguage } from "../context/language";
import { enResources } from "../resources/resources";
import { esResources } from "../resources/resources-es";

type Languages = "EN" | "ES";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "absolute",
    display: "flex",
    fontSize: "calc(7px + 1vmin)",
    // marginTop: "20px",
    // width: "60%"
    left: "20px",
    top: "20px"
  },
  language: {
    fontWeight: 700,
    marginLeft: "10px"
  },
  toggleOut: {
    backgroundColor: "rbg(128, 128, 128)",
    border: "2px solid rgba(17, 103, 177, 0.44)",
    borderRadius: "20px",
    height: "30px",
    width: "60px"
  }
});

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
    <div className={css(styles.container)} onClick={onToggle}>
      <div className={css(styles.toggleOut)}>
        <div
          className={`rounded-full h-6 w-6 left-0.5 relative top-0.5 transition-all ${
            language === "EN"
              ? "bg-indigo-600	left-0.5"
              : "bg-green-600 left-3.5"
          }`}
        ></div>
      </div>
      <span className={css(styles.language)}>{language}</span>
    </div>
  );
};
