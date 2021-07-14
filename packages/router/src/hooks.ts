import { useContext, useRef } from "@hydrophobefireman/ui-lib";

import { Ctx } from "./router-context";

export function usePaths(path: string) {
  const previousPathRef = useRef<string>();
  const previousPath = previousPathRef.current;
  const pathsChanged = previousPath !== path;
  previousPathRef.current = path;
  return { previousPath, pathsChanged };
}

export function useTransitionRouter() {
  return useContext(Ctx);
}
