import {State, subscribe, unsubscribe} from "statedrive";

import {useEffect} from "@hydrophobefireman/ui-lib";

interface Listener<T> {
  (oldValue: T, newValue: T): void;
}

export function useAtomListener<T>(atom: State<T>, listener: (v: T) => void) {
  useEffect(() => {
    const fn: Listener<T> = (_, newVal) => {
      listener(newVal);
    };
    subscribe(atom, fn);
    return () => unsubscribe(atom, fn);
  }, [listener]);
}
