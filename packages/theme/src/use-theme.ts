import { useSharedState } from "statedrive";

import { useAtomListener } from "@hydrophobefireman/kit/hooks";

import { ThemeAtom } from "./state";
import { ThemeListener } from "./types";
export function useTheme() {
  const [theme, setTheme] = useSharedState(ThemeAtom);
  function toggle() {
    setTheme(theme === "dark" ? "light" : "dark");
  }
  return {
    currentTheme: theme,
    toggle,
    setTheme,
  };
}

export function useOnThemeChange(listener: ThemeListener) {
  useAtomListener(ThemeAtom, listener);
}
