import { useEffect, useLayoutEffect } from "@hydrophobefireman/ui-lib";
type Cb = () => unknown | (() => void);
export function useMount(fn: Cb) {
  return useEffect(fn, []);
}

useMount.layout = function (fn: Cb) {
  return useLayoutEffect(fn, []);
};
