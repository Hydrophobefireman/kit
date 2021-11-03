import { join } from "path";

import { readFile, writeFile } from "./actions.mjs";
import {
  fromPackageJson,
  isMain,
  packageDir,
  packageJsonLoc,
  prettyJSON,
} from "./util.mjs";

async function updatePackages() {
  const packageJson = await fromPackageJson();
  const { kitPackages, version, peerDependencies, kitBase } = packageJson;

  await Promise.all(
    kitPackages.map(async (x) => {
      const folder = join(packageDir, x);
      const subPackageJson = join(folder, "package.json");
      const js = JSON.parse((await readFile(subPackageJson)).toString());
      js.version = version;
      js.peerDependencies = Object.assign({}, peerDependencies);
      await writeFile(subPackageJson, prettyJSON(js));
    })
  );
  const exportsField = Object.assign({}, kitBase.exports);
  kitPackages.forEach((packageName) => {
    exportsField[`./${packageName}`] = `./${packageName}/src/index.js`;
  });
  packageJson.exports = exportsField;
  await writeFile(packageJsonLoc, prettyJSON(packageJson));
}
const _updatePackages = updatePackages;
export { _updatePackages as updatePackages };

if (isMain(import.meta.url)) {
  updatePackages();
}
