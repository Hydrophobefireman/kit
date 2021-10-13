import { _util } from "@hydrophobefireman/kit";
import { useMemo } from "@hydrophobefireman/ui-lib";
let _id = 0;
const kitAutoIdPrefix = _util.ID_PREFIX + _util.random();
const nextId = () => ++_id;

export function useId(defaultId?: string) {
  const currentIdx = useMemo(() => String(defaultId || nextId()), [defaultId]);
  const idx = defaultId ? currentIdx : `${kitAutoIdPrefix}-${currentIdx}`;
  return idx;
}

export function useLabelId(defaultId?: string) {
  const id = useId(defaultId);
  return [id, `${id}--label`];
}
