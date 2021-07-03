import { ThemeAtom } from "./state";
import { ThemeListener } from "./types";
import { useAtomListener } from "@hydrophobefireman/kit/hooks";
import { useSharedState } from "statedrive";
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
