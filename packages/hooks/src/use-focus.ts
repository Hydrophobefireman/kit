import {useEffect, useRef, useState} from "@hydrophobefireman/ui-lib";

import {useMount} from "./use-mount";

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

export function useImperativeFocus() {
  const [initiallyFocused, setInitiallyFocused] = useState<Element | null>(
    null
  );
  const [lastFocused, setLastFocus] = useState<Element | null>(null);
  const onUnmount = useRef<() => void>();
  useMount(() => {
    const {activeElement} = document;
    setInitiallyFocused(activeElement);
    setLastFocus(activeElement);
    return () => {
      onUnmount.current && onUnmount.current();
    };
  });
  function update() {
    setLastFocus(document.activeElement);
  }
  function restoreOnUnmount({to}: {to?: "initial" | "custom"} = {}) {
    to = to || "initial";
    onUnmount.current = function () {
      to === "custom"
        ? lastFocused && (lastFocused as HTMLElement).focus()
        : initiallyFocused && (initiallyFocused as HTMLElement).focus();
    };
  }

  return {initiallyFocused, lastFocus: lastFocused, update, restoreOnUnmount};
}
