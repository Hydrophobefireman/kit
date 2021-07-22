import { useEffect } from "@hydrophobefireman/ui-lib";

import { useLatestRef } from "./use-latest-ref";

const config = { attributes: false, childList: true, subtree: true };

export function useObserver(current: HTMLElement, cb: MutationCallback) {
  const callback = useLatestRef(cb);
  useEffect(() => {
    if (!current) return;
    let unmount = false;
    const cb: MutationCallback = (mutations, obs) => {
      if (unmount) return;
      callback.current(mutations, obs);
    };
    const observer = new MutationObserver(cb);
    observer.observe(current, config);
    return () => {
      unmount = true;
      observer.disconnect();
    };
  }, [current]);
}
