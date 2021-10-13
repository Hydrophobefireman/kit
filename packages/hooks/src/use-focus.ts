import { useEffect, useRef } from "@hydrophobefireman/ui-lib";

import { useMount } from "./use-mount";

export function useFocus<T extends HTMLElement>() {
  const ref = useRef<T>();
  const previouslyFocused = useRef<Element | null>();
  const restore = () =>
    previouslyFocused.current && (previouslyFocused.current as any).focus();
  const update = () => (previouslyFocused.current = document.activeElement);
  useMount(update);
  useEffect(() => {
    ref.current && ref.current.focus();
  }, [ref.current]);
  return {
    ref,
    restore,
    setPreviouslyFocused: update,
  };
}
