//write test for util.js

const { getDirectories, decompressLZ4 } = require("./util.js");

test("getDirectories", async () => {
  const dirs = await getDirectories(
    "C:\\Users\\Puneet-Pc\\AppData\\Roaming\\Mozilla\\Firefox\\Profiles"
  );
  expect(dirs).toEqual(["2pn3v74b.default-release"]);
});
