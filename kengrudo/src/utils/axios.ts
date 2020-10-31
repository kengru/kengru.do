import axios from "axios";
import { Config } from "./config";

export const odin = axios.create({
  baseURL: Config.ODIN_URL
});

export const lastfm = axios.create({
  baseURL: `http://ws.audioscrobbler.com/2.0`
});
