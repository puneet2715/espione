//write test for firefox.js

const getFirefoxProfiles = require("./firefox.js").getFirefoxProfiles;

test("getFirefoxProfiles", async () => {
  const profiles = await getFirefoxProfiles();
  expect(profiles).toEqual([
    "C:\\Users\\Puneet-Pc\\AppData\\Roaming\\Mozilla\\Firefox\\Profiles\\2pn3v74b.default-release",
  ]);
});

const getFirefoxSessions = require("./firefox.js").getFirefoxSessions;

test("getFirefoxSessions", async () => {
  const profiles = await getFirefoxProfiles();
  const sessions = await getFirefoxSessions(profiles);
  expect(sessions);
});

const parseFirefoxSession = require("./firefox.js").parseFirefoxSession;

test("parseFirefoxSession", async () => {
  const profiles = await getFirefoxProfiles();
  const sessions = await getFirefoxSessions(profiles);
  const parsedSessions = parseFirefoxSession(sessions[0]);
  expect(parsedSessions);
});
