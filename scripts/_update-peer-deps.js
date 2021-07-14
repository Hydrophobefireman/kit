const {
  postpublish,
  packageDir,
  prettyJSON,
  fromPackageJson,
  packageJsonLoc,
} = require("./util");
const { readFile, writeFile } = require("./actions");
const { join } = require("path");

async function updatePackages() {
  await postpublish();
  const packageJson = await fromPackageJson();
  const { kitPackages, version, name, peerDependencies, kitBase } = packageJson;

  await Promise.all(
    kitPackages.map(async (x) => {
      const folder = join(packageDir, x);
      const otherPackages = kitPackages.filter((package) => package !== x);
      const subPackageJson = join(folder, "package.json");
      const js = JSON.parse((await readFile(subPackageJson)).toString());
      js.version = version;
      js.peerDependencies = Object.assign({}, peerDependencies);
      js.peerDependencies[name] = version;
      otherPackages.forEach((packageName) => {
        js.peerDependencies[`${name}/${packageName}`] = version;
      });
      await writeFile(subPackageJson, prettyJSON(js));
    })
  );
  const exportsField = Object.assign({}, kitBase.exports);
  const scripts = Object.assign({}, kitBase.scripts);
  kitPackages.forEach((packageName) => {
    exportsField[
      `./${packageName}`
    ] = `./${packageName}/dist/${packageName}.modern.js`;
    scripts[
      `build:${packageName}`
    ] = `npm run chore:build -- --cwd ./packages/${packageName} && npm run chore:move-types -- ./packages/${packageName}`;
  });
  packageJson.exports = exportsField;
  packageJson.scripts = scripts;
  await writeFile(packageJsonLoc, prettyJSON(packageJson));
}
module.exports.updatePackages = updatePackages;

if (require.main === module) {
  updatePackages();
}
