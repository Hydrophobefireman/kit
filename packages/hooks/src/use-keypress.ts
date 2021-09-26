import { Keys } from "./types";
import { UseKeyboardOptions, useKeyboard } from "./use-keyboard-event";

export function useKeyPress(
  k: Keys | Keys[],
  listener: (e: JSX.TargetedKeyboardEvent<any>) => void,
  options: UseKeyboardOptions
) {
  return useKeyboard((e) => {
    if ((Array.isArray(k) && (k as any).includes(e.key)) || e.key === k) {
      listener(e);
    }
  }, options);
}
