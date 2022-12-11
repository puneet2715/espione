const { readdir } = require("fs/promises");
const lz4 = require("lz4");
// import { readdir } from "fs/promises";
// import lz4 from "lz4";
/**
 *
 * @param {string} source
 * @returns
 */
const getDirectories = async (source) =>
  (await readdir(source, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

/**
 * Decompress jsonlz4 file buffer
 *
 * @param {Buffer} inputBuffer File buffer
 *
 * @returns {JSON}
 */
const decompressLZ4 = (inputBuffer) => {
  // Verify inputBuffer is a buffer
  if (!Buffer.isBuffer(inputBuffer)) {
    throw new Error("Input is not of type Buffer");
  }

  // Verifiy custom Mozilla LZ4 header / Magic number
  if (inputBuffer.subarray(0, 8).toString() !== "mozLz40\0") {
    throw new Error("Input does not seem to be jsonlz4 format");
  }

  const outputBuffer = Buffer.alloc(inputBuffer.readUInt32LE(8));

  lz4.decodeBlock(inputBuffer, outputBuffer, 12);

  return JSON.parse(outputBuffer.toString());
};

module.exports = {
  getDirectories,
  decompressLZ4,
};
