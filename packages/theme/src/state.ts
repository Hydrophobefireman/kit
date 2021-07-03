import { createState, subscribe } from "statedrive";

import { Theme } from "./types";
import { UI_THEME_ATTRIBUTE } from "./constants";
import { _util } from "@hydrophobefireman/kit";

const { getDocElAttribute, setDocElAttribute } = _util;
export const ThemeAtom = createState<Theme>({
  initialValue:
    getDocElAttribute(UI_THEME_ATTRIBUTE) == "dark" ? "dark" : "light",
});

subscribe(ThemeAtom, (_, n) => {
  setDocElAttribute(UI_THEME_ATTRIBUTE, n);
});
