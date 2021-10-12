import { RefType, useCallback, useState } from "@hydrophobefireman/ui-lib";

// logic with optimisations and changes from
// https://github.com/geist-org/react/blob/master/components/shared/dropdown.tsx

function rect(el?: HTMLElement) {
  return el ? el.getBoundingClientRect() : defaultRect;
}
export function getOffsetRect(
  target?: HTMLElement,
  reference?: HTMLElement
): OffsetRect {
  if (typeof window === "undefined" || !target) return defaultRect;
  const r = rect(target);
  const previousSibling = rect(reference);
  return {
    right: r.right,
    top:
      (previousSibling ? previousSibling.bottom + 2 : r.bottom) +
      document.documentElement.scrollTop,
    left: r.left + document.documentElement.scrollLeft,
    width: r.width || r.right - r.left,
    height: r.height,
  };
}

export interface OffsetRect {
  right: number;
  top: number;
  left: number;
  width: number;
  height: number;
}

export const defaultRect = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: 0,
  height: 0,
};

export function useRect(
  parent: RefType<HTMLElement>,
  ref?: RefType<HTMLElement>
) {
  const [rect, setRect] = useState<OffsetRect>(defaultRect);
  const sync = function sync() {
    const r = getOffsetRect(parent.current, ref && ref.current);
    setRect(r);
    return r;
  };
  return { rect, sync };
}
