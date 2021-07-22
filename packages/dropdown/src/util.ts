// logic with optimisations and changes from
// https://github.com/geist-org/react/blob/master/components/shared/dropdown.tsx

import { OffsetRect } from "./types";

export const defaultRect = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: 0,
  height: 0,
};
function rect(el?: HTMLElement) {
  return el ? el.getBoundingClientRect() : defaultRect;
}
export function getOffsetRect(
  el?: HTMLElement,
  self?: HTMLElement
): OffsetRect {
  if (typeof window === "undefined" || !el) return defaultRect;
  const r = rect(el);
  const previousSibling = rect(
    self && (self.previousElementSibling as HTMLElement)
  );
  return {
    right: r.right,
    top:
      (previousSibling ? previousSibling.bottom + 2 : r.bottom) +
      document.documentElement.scrollTop,
    left: r.left + document.documentElement.scrollLeft,
    width: r.width || r.right - r.left,
  };
}
