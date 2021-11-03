import { useLatestRef } from "./use-latest-ref";
import { useMount } from "./use-mount";

export function useScroll(
  cb: (e: Event) => void,
  options?: AddEventListenerOptions
) {
  const ref = useLatestRef(cb);
  useMount(() => {
    const callback = (e: Event) => ref.current(e);
    window.addEventListener("scroll", callback, options || {});
    return () => window.removeEventListener("scroll", callback);
  });
}
