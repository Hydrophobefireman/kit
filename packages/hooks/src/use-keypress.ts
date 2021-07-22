import { Keys } from "./types";
import { UseKeyboardOptions, useKeyboard } from "./use-keyboard-event";

export function useKeyPress(
  k: Keys,
  listener: (e: JSX.TargetedKeyboardEvent<any>) => void,
  options: UseKeyboardOptions
) {
  return useKeyboard((e) => e.key === k && listener(e), options);
}
