import {createState, subscribe} from "statedrive";

import {_util} from "@hydrophobefireman/kit";

import {UI_THEME_ATTRIBUTE} from "./constants";
import {Theme} from "./types";

const {getDocElAttribute, setDocElAttribute} = _util;
export const ThemeAtom = createState<Theme>({
  initialValue:
    getDocElAttribute(UI_THEME_ATTRIBUTE) == "dark" ? "dark" : "light",
});

subscribe(ThemeAtom, (_, n) => {
  setDocElAttribute(UI_THEME_ATTRIBUTE, n);
});
