import { useEffect } from "@hydrophobefireman/ui-lib";

import { useLatestRef } from "./use-latest-ref";

export function useClickAway(listener: () => void, target: EventTarget) {
  const ref = useLatestRef(listener);

  useEffect(() => {
    if (!target) return;
    const cb = () => ref.current();
    const listener = (event: Event) => {
      const path = (event as any).path;
      if (
        !((path && path.length ? path : null) || event.composedPath()).includes(
          target
        )
      ) {
        cb();
      }
    };
    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, [target]);
}
