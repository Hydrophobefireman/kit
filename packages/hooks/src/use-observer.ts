import { RefType, useEffect } from "@hydrophobefireman/ui-lib";

const config = { attributes: false, childList: true, subtree: true };

export function useObserver(
  ref: RefType<HTMLElement>,
  callback: MutationCallback
) {
  useEffect(() => {
    const { current } = ref;
    if (!current) return;
    let unmount = false;
    const cb: MutationCallback = (mutations, obs) => {
      if (unmount) return;
      callback(mutations, obs);
    };
    const observer = new MutationObserver(cb);
    observer.observe(current, config);
    return () => {
      unmount = true;
      observer.disconnect();
    };
  }, [ref.current]);
}
