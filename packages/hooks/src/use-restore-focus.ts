import { useRef } from "@hydrophobefireman/ui-lib";

import { useMount } from "./use-mount";

export function useRestoreFocus() {
  const previouslyFocused = useRef<Element | null>();
  const restore = () =>
    previouslyFocused.current && (previouslyFocused.current as any).focus();
  useMount(() => {
    previouslyFocused.current = document.activeElement;
    return restore;
  });
  return restore;
}
