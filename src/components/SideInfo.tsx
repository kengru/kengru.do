import { useEffect, useState } from "react";
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

import logo from "../images/kengru-logo.png";

type LastFMData = {
  artist: string;
  track: string;
};

function SideInfo() {
  const { resources } = useLanguage();
  const [lastFM, setLastFM] = useState<LastFMData>({
    artist: "Loading",
    track: "Song"
  });

  useEffect(() => {
    const fetchArtistTrack = async () => {
      try {
        const listening = await lastfm.get(
          `/?method=user.getrecenttracks&user=kengru&api_key=${Config.LASTFM_KEY}&format=json`
        );
        const lastSong = listening.data.recenttracks.track[0];
        setLastFM({
          artist: lastSong.artist["#text"],
          track: lastSong.name
        });
      } catch (error) {
        setLastFM({
          artist: `Error with the lastFM API.`,
          track: ``
        });
      }
    };

    fetchArtistTrack();
  }, []);

  return (
    <div className="flex flex-col sm:h-full pl-4 pr-4 sm:pl-8 sm:pr-0 mt-10 justify-end">
      <div className="flex h-full flex-col justify-center">
        <img
          className="object-fit w-40 sm:h-10 sm:w-60"
          src={logo}
          alt="logo"
        />
        <div className="pt-1 font-semibold italic">
          Kendry Alexander Grullón
        </div>
        <div className="flex flex-col mt-5 text-base">
          <span className="font-semibold italic">{resources.ListeningTo}</span>
          <span>{lastFM.artist}</span>
          <span>{lastFM.track}</span>
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
        <div className="hidden sm:block">
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
