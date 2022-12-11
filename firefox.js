const { readFile } = require("fs/promises");
const { join } = require("path");
const { decompressLZ4, getDirectories } = require("./util");
// import { readFile } from "fs/promises";
// import { join } from "path";
// import { decompressLZ4, getDirectories } from "./util.js";

/**
 * Path to the user's home directory
 */
const APP_DATA = process.env.APPDATA;

const FIREFOX_PATH = APP_DATA + "\\Mozilla\\Firefox";

const FIREFOX_PROFILE_PATH = FIREFOX_PATH + "\\Profiles";

const SESSIONSTORE_BACKUPS = "sessionstore-backups";
// console.log(FIREFOX_PROFILE_PATH)

//Mozilla\Firefox\Profiles\2pn3v74b.default-release

async function getFirefoxProfiles() {
  const profilesDirNames = await getDirectories(FIREFOX_PROFILE_PATH);

  const profilesDir = profilesDirNames.map((p) =>
    join(FIREFOX_PROFILE_PATH, p)
  );

  return profilesDir;

  // const sessionstoreDir = await getDirectories(SESSIONSTORE_BACKUPS)
}

/**
 *
 * @param {string[]} profilesDir
 * @returns JSON[]
 */
async function getFirefoxSessions(profilesDir) {
  const sessions = [];

  for (const profileDir of profilesDir) {
    try {
      //   console.log(profileDir);
      const buffer = await readFile(
        profileDir + "\\" + SESSIONSTORE_BACKUPS + "\\recovery.jsonlz4"
      );

      const json = decompressLZ4(buffer);

      sessions.push(json);

      // const entr = json["windows"][0]["tabs"][0]['entries']

      //   console.log(entr[entr.length - 1]);
    } catch (error) {
      //   console.log(error);
    }
  }

  return sessions;
}

/**
 *
 * @param {JSON} session
 */
function parseFirefoxSession(session) {
  const windows = session["windows"];

  const tabs = windows.flatMap((window) => window["tabs"]);

  const tabEntries = tabs.map((tab) => tab["entries"]);

  const sites = tabEntries.map((tabEntry) => tabEntry[tabEntry.length - 1]);

  return sites.map(({ url, title }) => ({ url, title }));
}

module.exports = {
  getFirefoxProfiles,
  getFirefoxSessions,
  parseFirefoxSession,
};
