import {useCallback, useState} from "@hydrophobefireman/ui-lib";

export function useToggleState(initial?: boolean) {
  const [active, setActive] = useState(!!initial);
  return {
    active,
    setActive,
    toggle: useCallback(() => setActive((x) => !x), []),
  };
}
