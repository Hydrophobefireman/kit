import { useEffect, useRef } from "@hydrophobefireman/ui-lib";

import { Keys } from "./types";

const Win = typeof window !== "undefined" && window;
export type KeyboardMode = "keydown" | "keyup" | "keypress";
export interface UseKeyboardOptions {
  mode?: KeyboardMode;
  target?: EventTarget;
  passive?: boolean;
}

export function useKeyboard(
  listener: (e: JSX.TargetedKeyboardEvent<any>) => void,
  { mode, target, passive = true }: UseKeyboardOptions = {}
) {
  target = target || Win;
  mode = mode || "keydown";
  const l = useRef(listener);
  l.current = listener;
  useEffect(() => {
    if (!target) return;
    function listener(e: JSX.TargetedKeyboardEvent<any>) {
      l.current(e);
    }
    target.addEventListener(mode, listener, { passive });
    return () => target.removeEventListener(mode, listener);
  }, [mode, target]);
}
