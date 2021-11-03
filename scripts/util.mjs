import {join} from "path";
import process from "process";
import {fileURLToPath} from "url";

import {rRoot, readFile, rm, root} from "./actions.mjs";

const packageJsonLoc = join(root, "package.json");
const packageDir = join(root, "packages");

/**@returns {Promise<typeof import("../package.json")>} */
async function fromPackageJson() {
  const js = await readFile(packageJsonLoc);
  return JSON.parse(js.toString());
}

async function postpublish() {
  const {kitPackages} = await fromPackageJson();
  await rm(join(root, "dist"), {force: true, recursive: true});
  return await Promise.all(
    kitPackages.map(async (x) => {
      const loc = join(root, x);
      try {
        await rm(loc, {force: true, recursive: true});
      } catch (e) {
        console.log("[prebuild] Skip clean", rRoot(loc));
      }
    })
  );
}

function prettyJSON(x) {
  return JSON.stringify(x, null, 3);
}

function isMain(importMetaUrl) {
  return process.argv[1] === fileURLToPath(importMetaUrl);
}
export {
  isMain,
  prettyJSON,
  root,
  rRoot,
  packageDir,
  postpublish,
  fromPackageJson,
  packageJsonLoc,
};
