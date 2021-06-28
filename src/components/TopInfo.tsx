import { StyleSheet, css } from "aphrodite/no-important";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faTwitter,
  faLinkedinIn,
  faMedium
} from "@fortawesome/free-brands-svg-icons";
import logo from "../images/kengru-logo.png";

const styles = StyleSheet.create({
  top: {
    display: "none",
    width: "100%",
    height: "210px",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    "@media (max-width: 1110px)": {
      display: "flex"
    },
    "@media (max-width: 550px)": {
      height: "195px"
    }
  },
  logo: {
    display: "block",
    margin: "auto",
    height: "2em"
  },
  text: {
    fontSize: "calc(9px + 1vmin)"
  },
  navList: {
    display: "flex",
    textAlign: "center" as const,
    listStyle: "none",
    padding: "0em"
  },
  listItem: {
    color: "#07020D",
    width: "100%",
    textDecoration: "none",
    padding: "0.4em 0em 0.4em 0em",
    transform: "perspective(1px) translateZ(0)",
    transitionProperty: "transform",
    transitionDuration: "0.3s",
    ":hover": {
      transform: "translateY(-4px)"
    }
  },
  listItemActive: {
    fontWeight: "bold"
  },
  container: {
    display: "flex",
    height: "65%",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  first: {},
  icons: {
    marginBottom: "1em"
  },
  brandLink: {
    textDecoration: "none",
    ":hover": {
      color: "#03254C"
    },
    ":visited": {
      color: "#07020D"
    }
  },
  icon: {
    color: "#07020D",
    textDecoration: "none",
    ":hover": {
      color: "#1167b1"
    },
    height: "2em",
    paddingLeft: "1em",
    paddingRight: "1em"
  }
});

function TopInfo() {
  return (
    <div className={css(styles.top)}>
      <div className={css(styles.container)}>
        <div className={css(styles.first)}>
          <img className={css(styles.logo)} src={logo} alt="logo" />
          {/* <div className={css(styles.icons)}>
            <a
              className={css(styles.brandLink)}
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/kengru"
            >
              <FontAwesomeIcon className={css(styles.icon)} icon={faGithub} />
            </a>
            <a
              className={css(styles.brandLink)}
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/kxngru"
            >
              <FontAwesomeIcon className={css(styles.icon)} icon={faTwitter} />
            </a>
            <a
              className={css(styles.brandLink)}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/kengru/"
            >
              <FontAwesomeIcon
                className={css(styles.icon)}
                icon={faLinkedinIn}
              />
            </a>
            <a
              className={css(styles.brandLink)}
              target="_blank"
              rel="noopener noreferrer"
              href="https://medium.com/@kengru"
            >
              <FontAwesomeIcon className={css(styles.icon)} icon={faMedium} />
            </a>
          </div> */}
          {/* <div>
            <a
              className={css(styles.brandLink)}
              target="_blank"
              rel="noopener noreferrer"
              href={`https://firebasestorage.googleapis.com/v0/b/kengru-do.appspot.com/o/public%2FKGrullon-Resume.pdf?alt=media&token=c884163a-356c-437e-9df5-5ca29c8b96f5`}
            >Resume</a>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export { TopInfo };
