import { RefType, useEffect } from "@hydrophobefireman/ui-lib";

export function useFwdRef<T>(source: RefType<T>, dest?: RefType<T>) {
  useEffect(() => {
    dest && (dest.current = source.current);
  }, [source.current]);
}
