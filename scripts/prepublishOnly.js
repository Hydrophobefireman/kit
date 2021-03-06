const {join} = require("path");
const {updatePackages} = require("./_update-peer-deps");
const {dist, rename, root} = require("./actions");
const {fromPackageJson} = require("./util");

const packages = join(dist, "packages");

async function movePackage(name) {
  const src = join(packages, name);
  const dest = join(root, name);
  await rename(src, dest);
}

async function main() {
  await updatePackages();
  const {kitPackages} = await fromPackageJson();
  await Promise.all(kitPackages.map((x) => movePackage(x)));
}

if (require.main === module) {
  main();
}
