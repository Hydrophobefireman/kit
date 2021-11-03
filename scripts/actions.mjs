import {dirname, join, relative} from "path";
import {fileURLToPath} from "url";

import {
  copyFile as _copyFile,
  mkdir as _mkdir,
  readFile as _readFile,
  readdir as _readdir,
  rename as _rename,
  rm as _rm,
  writeFile as _writeFile,
} from "fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dist = join(root, "dist");
function rRoot(path) {
  return relative(root, path);
}

/** @type {fs['writeFile']} */
const writeFile = async function writeFile(path, data) {
  console.log(`[fs] Writing to ${rRoot(path)}`);
  return await _writeFile(path, data);
};

/** @type {fs['readFile']} */
const readFile = async function readFile(path) {
  console.log(`[fs] Reading ${rRoot(path)}`);
  return await _readFile(path);
};

/** @type {fs['rm']} */
const rm = async function rm(path, options) {
  console.log(`$ rm -rf ${rRoot(path)}`);
  return await _rm(path, options);
};

/** @type {fs['mkdir']} */
const mkdir = async function mkdir(path, ...rest) {
  console.log(`$ mkdir ${rRoot(path)}`);
  return await _mkdir(path, ...rest);
};

/** @type {fs['readdir']} */
const readdir = async function readdir(path, ...rest) {
  console.log(`[fs] Reading ${rRoot(path)}/`);
  return await _readdir(path, ...rest);
};

/** @type {fs['rename']} */
const rename = async function rename(src, dest) {
  console.log(`$ mv ${rRoot(src)} ${rRoot(dest)}`);
  return await _rename(src, dest);
};

/**@type {fs['copyFile']} */
const copyFile = async function copyFile(src, dest, ...rest) {
  console.log(`$ cp ${rRoot(src)} ${rRoot(dest)}`);
  return await _copyFile(src, dest);
};
export {
  writeFile,
  dist,
  readFile,
  rm,
  mkdir,
  readdir,
  rename,
  rRoot,
  root,
  copyFile,
};
