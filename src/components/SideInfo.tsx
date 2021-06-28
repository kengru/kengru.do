import { useEffect, useState } from "react";
import { StyleSheet, css } from "aphrodite/no-important";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faTwitter,
  faLinkedinIn,
  faMedium
} from "@fortawesome/free-brands-svg-icons";
import { useLanguage } from "../context/language";

import { ToggleLang } from "./ToggleLang";
import { Config } from "../utils/config";
import { lastfm } from "../utils/axios";
import { roboto } from "../fonts/fonts";

import logo from "../images/kengru-logo.png";

const styles = StyleSheet.create({
  side: {
    display: "flex",
    height: "100%",
    paddingLeft: "2em",
    flexDirection: "column",
    justifyContent: "flex-end",
    fontSize: "calc(10px + 1vmin)",
    "@media (max-width: 1110px)": {
      display: "none"
    }
  },
  logo: {
    alignSelf: "flex-start",
    height: "2em"
  },
  name: {
    paddingTop: "0.2em",
    fontFamily: roboto.i500
  },
  text: {
    fontSize: "calc(9px + 1vmin)"
  },
  navList: {
    display: "flex",
    flexDirection: "column",
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
      transform: "translateX(8px)"
    }
  },
  listItemActive: {
    fontWeight: "bold"
  },
  container: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center"
  },
  menu: {},
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
  },
  listening: {
    display: "flex",
    marginTop: "2em",
    flexDirection: "column",
    fontSize: "calc(7px + 1vmin)",
    lineHeight: "1.3"
  },
  lto: {
    fontFamily: roboto.i500
  },
  footer: {
    marginBottom: "2em"
  }
});

function SideInfo() {
  const [artist, setArtist] = useState("");
  const [track, setTrack] = useState("");
  const { resources } = useLanguage();

  useEffect(() => {
    const fetchArtistTrack = async () => {
      try {
        const listening = await lastfm.get(
          `/?method=user.getrecenttracks&user=kengru&api_key=${Config.LASTFM_KEY}&format=json`
        );
        const lastSong = listening.data.recenttracks.track[0];
        setArtist(lastSong.artist["#text"]);
        setTrack(lastSong.name);
      } catch (error) {
        setArtist(`Error with the lastFM API.`);
      }
    };

    fetchArtistTrack();
  }, []);

  return (
    <div className={css(styles.side)}>
      <div className={css(styles.container)}>
        <div className={css(styles.menu)}>
          <img className={css(styles.logo)} src={logo} alt="logo" />
          <div className={css(styles.name)}>Kendry Alexander Grullón</div>
          <div className={css(styles.listening)}>
            <span className={css(styles.lto)}>{resources.ListeningTo}</span>
            <span>{artist}</span>
            <span>{track}</span>
          </div>
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

export { SideInfo };
