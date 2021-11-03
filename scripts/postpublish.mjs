import {isMain, postpublish} from "./util.mjs";

if (isMain(import.meta.url)) {
  postpublish();
}
