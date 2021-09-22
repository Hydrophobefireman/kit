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
