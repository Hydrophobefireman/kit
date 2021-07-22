import { useCallback, useState } from "@hydrophobefireman/ui-lib";

import { useResize } from "./use-resize";

const getDimensions = (): [number, number] => [
  window.innerHeight,
  window.innerWidth,
];
export function useViewportSize(): [number, number] {
  const [dimensions, setDimensions] = useState(getDimensions);
  const callback = useCallback(() => setDimensions(getDimensions), []);
  useResize(callback);
  return dimensions;
}
