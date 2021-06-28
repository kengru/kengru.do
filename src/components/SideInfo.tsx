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
  name: {
    paddingTop: "0.2em",
    fontFamily: roboto.i500
  },
  container: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center"
  },
  listening: {
    display: "flex",
    marginTop: "2em",
    flexDirection: "column",
    fontSize: "calc(7px + 1vmin)",
    lineHeight: "1.3"
  }
});

function SideInfo() {
  const { resources } = useLanguage();
  const [artist, setArtist] = useState("Loading");
  const [track, setTrack] = useState("Song");

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
        <img className="object-fit h-10" src={logo} alt="logo" />
        <div className={css(styles.name)}>Kendry Alexander Grullón</div>
        <div className="flex flex-col mt-5 text-base">
          <span className="font-semibold italic">{resources.ListeningTo}</span>
          <span>{artist}</span>
          <span>{track}</span>
        </div>
        <ul className="flex mt-5 mb-5">
          <li>
            <a
              aria-label="Github"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/kengru"
            >
              <FontAwesomeIcon
                className="hover:text-indigo-800 m-2"
                icon={faGithub}
              />
            </a>
          </li>
          <li>
            <a
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/kxngru"
            >
              <FontAwesomeIcon
                className="hover:text-indigo-800 m-2"
                icon={faTwitter}
              />
            </a>
          </li>
          <li>
            <a
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/kengru/"
            >
              <FontAwesomeIcon
                className="hover:text-indigo-800 m-2"
                icon={faLinkedinIn}
              />
            </a>
          </li>
          <li>
            <a
              aria-label="Medium"
              target="_blank"
              rel="noopener noreferrer"
              href="https://medium.com/@kengru"
            >
              <FontAwesomeIcon
                className="hover:text-indigo-800 m-2"
                icon={faMedium}
              />
            </a>
          </li>
        </ul>
        <div>
          <a
            className="w-24 h-10 flex items-center justify-center rounded-md bg-black text-white"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://firebasestorage.googleapis.com/v0/b/kengru-do.appspot.com/o/public%2FKAG_Resume.pdf?alt=media&token=6741e986-0571-40ce-8c3d-edbb507f2590`}
          >
            Resume
          </a>
        </div>
      </div>
    </div>
  );
}

export { SideInfo };
