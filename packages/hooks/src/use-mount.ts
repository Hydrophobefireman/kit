import { useEffect } from "@hydrophobefireman/ui-lib";

export function useMount(fn: () => unknown | (() => void)) {
  return useEffect(fn, []);
}
