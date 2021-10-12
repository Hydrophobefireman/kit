import { useMemo } from "@hydrophobefireman/ui-lib";

let _id = 0;
const kitAutoIdPrefix = `kit-auto-id-${Math.random()
  .toString(36)
  .substring(2)}`;
const nextId = () => ++_id;
export function kitId() {
  return `${kitAutoIdPrefix}:${nextId()}`;
}
export function useId(defaultId?: string) {
  const currentIdx = useMemo(() => String(defaultId || nextId()), [defaultId]);
  const idx = defaultId ? currentIdx : `${kitAutoIdPrefix}-${currentIdx}`;
  return idx;
}

export function useLabelId(defaultId?: string) {
  const id = useId(defaultId);
  return [id, `${id}--label`];
}
