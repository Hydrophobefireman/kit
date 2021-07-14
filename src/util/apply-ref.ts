import { warnOnce } from "./warn";

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
