import { join } from "path";

import { mkdir } from "./actions.mjs";
import { isMain, postpublish, root } from "./util.mjs";

async function main() {
  console.log(`Root: ${root}`);
  const core = join(root, "dist");
  await postpublish();
  await mkdir(core);
}

if (isMain(import.meta.url)) {
  main();
}
