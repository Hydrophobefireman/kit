import {useEffect} from "@hydrophobefireman/ui-lib";

import {useLatestRef} from "./use-latest-ref";

export type KeyboardMode = "keydown" | "keyup" | "keypress";
export interface UseKeyboardOptions {
  mode?: KeyboardMode;
  target?: EventTarget;
  passive?: boolean;
  enabled?: boolean;
}

export function useKeyboard(
  listener: (e: JSX.TargetedKeyboardEvent<any>) => void,
  {mode, target, passive = true, enabled = true}: UseKeyboardOptions
) {
  const keyboardMode = mode || "keydown";
  const l = useLatestRef(listener);
  useEffect(() => {
    if (!target || !enabled) return;
    function ev(e: JSX.TargetedKeyboardEvent<any>) {
      l.current(e);
    }
    target.addEventListener(keyboardMode, ev, {passive});
    return () => (target as any).removeEventListener(keyboardMode, ev);
  }, [keyboardMode, target, enabled]);
}
