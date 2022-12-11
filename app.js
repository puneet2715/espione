#!/usr/bin / env node
const {
  getFirefoxSessions,
  getFirefoxProfiles,
  parseFirefoxSession,
} = require("./firefox.js");
// import {
//   getFirefoxSessions,
//   getFirefoxProfiles,
//   parseFirefoxSession,
// } from "./firefox.js";

// const { processExists } = require("process-exists");
// import { processExists } from "process-exists";
const find = require("find-process");
// import { find } from "find-process";

async function printFirefoxSites() {
  const profilesDir = await getFirefoxProfiles();
  const sessions = await getFirefoxSessions(profilesDir);

  for (const session of sessions) {
    for (const site of parseFirefoxSession(session)) {
      console.log(`Title - ${site.title}`);
      console.log(`Url - ${site.url}`);
      console.log("--------------------------------------------------------------------------------");
      // process.stdout._write(`Title - ${site.title}\n`);
      // process.stdout._write(`Url - ${site.url}\n`);
      // process.stdout._write("----------------------------------------\n");
    }
  }
}

(async () => {
  // const isExist = await processExists("firefox.exe"); // will work if exe is not to be made

  // while (true) {
    find("name", "firefox.exe")
      .then(async (list) => {
        if (list.length >= 1) {
          await printFirefoxSites();
          while (true) {
            // console.log("please exit manually");
          }
        }
      })
      .catch(() => "Firefox may not be running ");
  // }

  // printFirefoxSites();

  // find('pid', 12345)
  // .then(function (list) {
  //   console.log(list);
  // }, function (err) {
  //   console.log(err.stack || err);
  // })

  // console.log(isExist);

  // if (!isExist) {
  //   console.log("Firefox is not running");
  // } else {
  //   printFirefoxSites();
  // }
})();
