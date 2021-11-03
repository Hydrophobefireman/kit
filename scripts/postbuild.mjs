import {join} from "path";

import {copyFile, dist, root} from "./actions.mjs";
import {fromPackageJson, isMain} from "./util.mjs";

const builtPackages = join(dist, "packages");
const srcPackages = join(root, "packages");

async function postbuild() {
  const {kitPackages} = await fromPackageJson();
  return await Promise.all(
    kitPackages.map(async (x) => {
      const sourceDir = join(srcPackages, x);
      const outDir = join(builtPackages, x);
      const packageJson = join(sourceDir, "package.json");
      return await copyFile(packageJson, join(outDir, "package.json"));
    })
  );
}

if (isMain(import.meta.url)) {
  postbuild();
}
