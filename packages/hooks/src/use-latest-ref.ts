import {useRef} from "@hydrophobefireman/ui-lib";

export function useLatestRef<T>(x: T) {
  const obj = useRef(x);
  obj.current = x;
  return obj;
}
