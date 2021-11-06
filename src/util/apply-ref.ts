import {RefType, useCallback} from "@hydrophobefireman/ui-lib";

import {warnOnce} from "./warn";

const refWarning = warnOnce();
export function applyRef(ref: any, value: any) {
  if (!ref) return;
  if (typeof ref === "function")
    return refWarning(
      ref(value),
      "Using function as an element's dom ref might" +
        " cause it to be called multiple times on each render"
    );
  ref.current = value;
}

type RefObj<R> = ((val: R) => void) | RefType<R>;

export function useSyncedRefs<R = any>(
  externalRef?: RefObj<R>,
  internalRef?: RefObj<R>
) {
  return useCallback(function (value: R) {
    // if (!value) return;
    applyRef(externalRef, value);
    applyRef(internalRef, value);
  }, []);
}
