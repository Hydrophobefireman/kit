import { _util } from "@hydrophobefireman/kit";
import { useEffect, useMemo, useState } from "@hydrophobefireman/ui-lib";
export function useMedia(query: string) {
  const q = useMemo(() => window.matchMedia(query), [query]);
  const [matches, setMatches] = useState(() => q.matches);
  useEffect(() => {
    setMatches(q.matches);
    function listener(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }
    q.addEventListener("change", listener);
    return () => q.removeEventListener("change", listener);
  }, [q]);
  return matches;
}

useMedia.usePrefersReducedMotion = function () {
  return useMedia("(prefers-reduced-motion)");
};

useMedia.usePrefersDarkTheme = function () {
  return useMedia("(prefers-color-scheme: dark)");
};

useMedia.useMinWidth = function (width: number | string) {
  return useMedia(`(min-width:${_util.toPx(width)})`);
};

useMedia.useMaxWidth = function (width: number | string) {
  return useMedia(`(max-width:${_util.toPx(width)})`);
};
useMedia.useMinHeight = function (height: number | string) {
  return useMedia(`(min-height:${_util.toPx(height)})`);
};

useMedia.useMaxHeight = function (height: number | string) {
  return useMedia(`(max-height:${_util.toPx(height)})`);
};
