const { rm } = require("./actions");
const { join } = require("path");
const { postpublish, root, packageDir, fromPackageJson } = require("./util");

async function main() {
  console.log(`Root: ${root}`);
  const core = join(root, "dist");
  await rm(core, { force: true, recursive: true });
  // run just in case
  await postpublish();
}

if (require.main === module) {
  main();
}
