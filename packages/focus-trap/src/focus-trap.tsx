import * as classnames from "@hydrophobefireman/kit/classnames";
import {useImperativeFocus, useKeyPress} from "@hydrophobefireman/kit/hooks";
import {useEffect, useRef} from "@hydrophobefireman/ui-lib";
export function FocusTrap({
  children,
  shouldTrap,
}: {
  children?: any;
  shouldTrap?: boolean;
}) {
  const divStart = useRef<HTMLDivElement>();
  const divEnd = useRef<HTMLDivElement>();
  const contentRef = useRef<HTMLDivElement>();
  const {restoreOnUnmount} = useImperativeFocus();
  restoreOnUnmount();
  useKeyPress(
    "Tab",
    (e) => {
      if (!shouldTrap) return;
      const {shiftKey} = e;
      const {activeElement} = document;
      if (shiftKey) {
        if (activeElement === divStart.current) {
          divEnd.current.focus();
        }
      } else if (activeElement === divEnd.current) {
        divStart.current.focus();
      }
    },
    {
      target: typeof window !== "undefined" ? window : (null as any),
      //   passive: false,
    }
  );
  useEffect(() => {
    if (shouldTrap) {
      const {activeElement} = document;
      const contentWrapper = contentRef.current;
      const start = divStart.current;
      const end = divEnd.current;
      // we have focus with us... leave
      if (
        contentWrapper === activeElement ||
        start === activeElement ||
        end === activeElement ||
        contentWrapper.contains(activeElement)
      )
        return;
      // give focus to starting div
      divStart.current && divStart.current.focus();
    }
  }, [shouldTrap]);
  return (
    <>
      <div tabIndex={0} ref={divStart} class={classnames._focusTrap} />
      <div ref={contentRef} style={{display: "contents"}}>
        {children}
      </div>
      <div tabIndex={0} ref={divEnd} class={classnames._focusTrap} />
    </>
  );
}
