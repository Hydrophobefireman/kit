import {useLatestRef} from "./use-latest-ref";
import {useMount} from "./use-mount";

export function useResize(c: () => void, options?: any) {
  const cb = useLatestRef(c);
  useMount(() => {
    const callback = () => cb.current();
    addEventListener("resize", callback, options || {passive: true});
    return () => removeEventListener("resize", callback);
  });
}
