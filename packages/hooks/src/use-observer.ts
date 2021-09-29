import {
  RefType,
  useEffect,
  useRef,
  useState,
} from "@hydrophobefireman/ui-lib";

import { useLatestRef } from "./use-latest-ref";

const defaultConfig = { attributes: false, childList: true, subtree: true };

export function useMutationObserver(
  current: HTMLElement,
  cb: MutationCallback,
  config = defaultConfig
) {
  const callback = useLatestRef(cb);
  useEffect(() => {
    if (!current) return;
    let unmount = false;
    const cb: MutationCallback = (mutations, obs) => {
      if (unmount) return;
      callback.current(mutations, obs);
    };
    const observer = new MutationObserver(cb);
    observer.observe(current, defaultConfig);
    return () => {
      unmount = true;
      observer.disconnect();
    };
  }, [current]);
}

export function useResizeObserver(
  target: RefType<HTMLElement>,
  cb: (rect: DOMRectReadOnly) => void
) {
  const cbRef = useLatestRef(cb);
  const resizeObserver = useRef<ResizeObserver>(null as any);
  useEffect(() => {
    resizeObserver.current = new ResizeObserver(([entry]) => {
      cbRef.current(entry.contentRect);
    });
    if (target.current) {
      resizeObserver.current.observe(target.current);
    }
    return () => {
      if (resizeObserver.current) {
        resizeObserver.current.disconnect();
      }
    };
  }, [target]);
}
