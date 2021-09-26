import { _util } from "@hydrophobefireman/kit";
import * as classnames from "@hydrophobefireman/kit/classnames";
import { bottomSheetInactive } from "@hydrophobefireman/kit/classnames";
import {
  useHideScrollbar,
  useKeyPress,
  useToggleState,
} from "@hydrophobefireman/kit/hooks";
import { useEffect, useRef } from "@hydrophobefireman/ui-lib";

import { BottomSheetProps } from "./types";

export function BottomSheet({
  active,
  height,
  onAnimationComplete,
  onDismiss,
  children,
}: BottomSheetProps) {
  const ref = useRef<HTMLDivElement>();
  const maskRef = useRef<HTMLDivElement>();
  useHideScrollbar(active);
  function handleTransitionEnd(e: TransitionEvent) {
    if (e.currentTarget !== ref.current) return;
    onAnimationComplete && onAnimationComplete();
  }
  function handleClose(e: MouseEvent) {
    if (e.currentTarget !== maskRef.current) return;
    onDismiss && onDismiss();
  }
  useKeyPress("Escape", () => active && onDismiss && onDismiss(), {
    target: window,
  });
  const style: any = height ? { height: _util.toPx(height) } : null;
  return (
    <div>
      {active && (
        <div
          aria-hidden
          className={classnames.mask}
          ref={maskRef}
          onClick={handleClose}
        />
      )}
      <div
        tabIndex={active ? 0 : -1}
        role="dialog"
        aria-modal
        onTransitionEnd={handleTransitionEnd}
        onTransitionEndCapture={handleTransitionEnd}
        ref={ref}
        style={style}
        class={[
          classnames.bottomSheet,
          active ? classnames.bottomSheetActive : bottomSheetInactive,
        ]}
      >
        {children}
      </div>
    </div>
  );
}

export { useToggleState as useBottomSheet };
