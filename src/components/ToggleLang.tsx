import { useCallback, useState } from "react";
import { StyleSheet, css } from "aphrodite/no-important";

import { useLanguage } from "../context/language";
import { enResources } from "../resources/resources";
import { esResources } from "../resources/resources-es";

type Languages = "EN" | "ES";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    display: "flex",
    fontSize: "calc(7px + 1vmin)",
    marginTop: "20px"
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
  },
  toggleIn: {
    // border: "1px solid black",
    borderRadius: "100%",
    height: "23px",
    left: "5px",
    position: "relative",
    transition: "left 200ms",
    top: "3px",
    width: "23px"
  },
  left: {
    backgroundColor: "#0066b2",
    left: "5px"
  },
  right: {
    backgroundColor: "#29AB87",
    left: "32px"
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
          className={css(
            styles.toggleIn,
            language === "EN" ? styles.left : styles.right
          )}
        ></div>
      </div>
      <span className={css(styles.language)}>{language}</span>
    </div>
  );
};
