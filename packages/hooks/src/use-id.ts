import { useMemo } from "@hydrophobefireman/ui-lib";

let _id = 0;
const kitAutoIdPrefix = `kit-auto-id-${Math.random()
  .toString(32)
  .substring(2)}`;

export function useId(defaultId?: string) {
  const currentIdx = useMemo(() => String(defaultId || ++_id), [defaultId]);
  const idx = defaultId ? currentIdx : `${kitAutoIdPrefix}-${currentIdx}`;
  return idx;
}

export function useLabelId(defaultId?: string) {
  const id = useId(defaultId);
  return [id, `${id}--label`];
}
