import {useLatestRef} from "./use-latest-ref";
import {useMount} from "./use-mount";

export function useScroll(cb: (e: Event) => void) {
  const ref = useLatestRef(cb);
  useMount(() => {
    const callback = (e: Event) => ref.current(e);
    window.addEventListener("scroll", callback);
    return () => window.removeEventListener("scroll", callback);
  });
}
