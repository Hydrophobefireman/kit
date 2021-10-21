import { Key, useEffect } from "@hydrophobefireman/ui-lib";

import { useLatestRef } from "./use-latest-ref";

export type KeyboardMode = "keydown" | "keyup" | "keypress";
export interface UseKeyboardOptions {
  mode?: KeyboardMode;
  target?: EventTarget;
  passive?: boolean;
}

const keyboardModeListenerMap = new Map<
  KeyboardMode,
  WeakMap<EventTarget, Set<any>>
>([
  ["keydown", new WeakMap<EventTarget, Set<any>>()],
  ["keyup", new WeakMap<EventTarget, Set<any>>()],
  ["keypress", new WeakMap<EventTarget, Set<any>>()],
]);

const listenerMap = new WeakMap<
  EventTarget,
  Map<KeyboardMode, (e: any) => void>
>();
function getListenerMap(e: EventTarget) {
  const m = listenerMap.get(e);
  if (!m) {
    const newMap = new Map<KeyboardMode, (e: any) => void>();
    listenerMap.set(e, newMap);
    return newMap;
  }
  return m;
}
function delegate(m: KeyboardMode, t: EventTarget) {
  return function (e: JSX.TargetedKeyboardEvent<any>) {
    keyboardModeListenerMap
      .get(m)!
      .get(t)!
      .forEach((x) => x(e));
  };
}

export function useKeyboard(
  listener: (e: JSX.TargetedKeyboardEvent<any>) => void,
  { mode, target, passive = true }: UseKeyboardOptions
) {
  const keyboardMode = mode || "keydown";
  const l = useLatestRef(listener);
  useEffect(() => {
    let kmode = keyboardMode;
    if (!target) return;
    const t = target;
    function ev(e: JSX.TargetedKeyboardEvent<any>) {
      l.current(e);
    }
    const map = keyboardModeListenerMap.get(kmode)!;
    let previousListeners = map.get(target);
    if (!previousListeners) {
      previousListeners = new Set<any>();
      map.set(target, previousListeners);
      const fn = delegate(kmode, target);
      const lm = getListenerMap(target);
      lm.set(kmode, fn);
      target.addEventListener(kmode, fn, { passive });
    }
    previousListeners.add(ev);

    return () => {
      previousListeners!.delete(ev);
      if (previousListeners!.size === 0) {
        const lm = getListenerMap(t);
        const fn = lm.get(kmode);
        target.removeEventListener(kmode, fn as any);
        lm.delete(kmode);
      }
    };
  }, [keyboardMode, target]);
}
