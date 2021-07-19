import { useState } from "@hydrophobefireman/ui-lib";

import { useMount } from "./use-mount";

function getScroll() {
  if (!window) return { x: 0, y: 0 };
  return { x: window.scrollX, y: window.scrollY };
}
export function useScroll() {
  const [obj, setScroll] = useState(getScroll);
  useMount(() => {
    const listener = () => setScroll(getScroll);
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  });
  return obj;
}
