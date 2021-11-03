import { join } from "path";

import { updatePackages } from "./_update-peer-deps.mjs";
import { dist, rename } from "./actions.mjs";
import { fromPackageJson, isMain } from "./util.mjs";

const packages = join(dist, "packages");

async function movePackage(name) {
  const src = join(packages, name);
  const dest = join(root, name);
  await rename(src, dest);
}

async function main() {
  await updatePackages();
  const { kitPackages } = await fromPackageJson();
  await Promise.all(kitPackages.map((x) => movePackage(x)));
}

if (isMain(import.meta.url)) {
  main();
}
