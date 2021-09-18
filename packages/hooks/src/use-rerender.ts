import { useCallback, useState } from "@hydrophobefireman/ui-lib";

export function useRerender() {
  const [, setState] = useState<any>(null);

  return useCallback(() => setState({}), []);
}
