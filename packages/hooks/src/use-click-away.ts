import {useEffect} from "@hydrophobefireman/ui-lib";

import {useLatestRef} from "./use-latest-ref";

export function useClickAway(
  listener: (e: JSX.TargetedMouseEvent<any>) => void,
  target: EventTarget
) {
  const ref = useLatestRef(listener);
  useEffect(() => {
    if (!target || !ref.current) return;
    const cb = (e: JSX.TargetedMouseEvent<any>) => ref.current(e);
    const listener = (event: JSX.TargetedMouseEvent<any>) => {
      let __path: EventTarget[];
      const $path = event.composedPath
        ? event.composedPath()
        : (__path = (event as any).path) && __path.length
        ? __path
        : [];
      if (!$path.includes(target)) {
        cb(event);
      }
    };
    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, [target]);
}
