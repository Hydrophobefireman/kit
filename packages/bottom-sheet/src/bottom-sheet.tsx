import { _util } from "@hydrophobefireman/kit";
import { buildPortal } from "@hydrophobefireman/kit/build-portal";
import * as classnames from "@hydrophobefireman/kit/classnames";
import { bottomSheetInactive } from "@hydrophobefireman/kit/classnames";
import {
  useHideScrollbar,
  useKeyPress,
  useSelfEvent,
  useToggleState,
} from "@hydrophobefireman/kit/hooks";
import { useRef } from "@hydrophobefireman/ui-lib";

import { BottomSheetProps } from "./types";

function _BottomSheet({
  active,
  height,
  onAnimationComplete,
  onDismiss,
  children,
}: BottomSheetProps) {
  const ref = useRef<HTMLDivElement>();
  useHideScrollbar(active);
  function handleTransitionEnd(e: TransitionEvent) {
    if (e.target !== e.currentTarget) return;
    onAnimationComplete && onAnimationComplete();
  }
  const handleClose = useSelfEvent<MouseEvent>(onDismiss);
  useKeyPress("Escape", () => active && onDismiss && onDismiss(), {
    target: window,
  });
  const style: any = height ? { height: _util.toPx(height) } : null;
  return (
    <div>
      {active && (
        <div aria-hidden className={classnames.mask} onClick={handleClose} />
      )}
      <div
        tabIndex={active ? 0 : -1}
        role="dialog"
        aria-hidden={!active}
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
export const BottomSheet = buildPortal<BottomSheetProps, typeof _BottomSheet>(
  "BottomSheet",
  _BottomSheet
);

export { useToggleState as useBottomSheet };
