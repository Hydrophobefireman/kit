import { useMemo } from "@hydrophobefireman/ui-lib";

let _id = 0;
const kitAutoIdPrefix = `__kit-auto-id-${Math.random()
  .toString(32)
  .substring(2)}`;

export function useId(defaultId?: string) {
  const currentIdx = useMemo(() => String(defaultId || ++_id), [defaultId]);
  const idx = defaultId ? currentIdx : `${kitAutoIdPrefix}-${currentIdx}`;
  return idx;
}
