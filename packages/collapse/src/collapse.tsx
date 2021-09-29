import { BaseElement, _util } from "@hydrophobefireman/kit";
import * as classnames from "@hydrophobefireman/kit/classnames";
import {
  useFwdRef,
  useLatestRef,
  useRect,
  useResizeObserver,
  useToggleState,
} from "@hydrophobefireman/kit/hooks";
import { h, useLayoutEffect, useRef } from "@hydrophobefireman/ui-lib";

function _inactive(style: CSSStyleDeclaration) {
  style.height = "0px";
  style.overflow = "hidden";
}
export function Collapse({
  children,
  dom,
  active,
  class: cls,
  className,
  ...rest
}: BaseElement<{ active?: boolean }>) {
  const klass = [className, cls, classnames.collapse];
  const ref = useRef<HTMLDivElement>();
  useFwdRef(ref, dom);
  const { rect, sync } = useRect(ref);
  const rectRef = useLatestRef(rect);
  const firstRender = useRef(true);
  const isPendingTransition = useRef(false);
  useResizeObserver(ref, () => !isPendingTransition.current && sync);
  console.log("ok");
  useLayoutEffect(() => {
    // referenceRect -> previous state
    let referenceRect = rectRef.current;
    // latestRect -> state after the previous render
    const style = ref.current && ref.current.style;
    if (isPendingTransition.current) {
      style.height = "";
    }
    const latestRect = sync();
    if (firstRender.current) {
      firstRender.current = false;
      if (!active) {
        _inactive(style);
      } else {
        style.height = `${latestRect.height}px`;
      }
      return;
    }
    if (active) {
      style.height = `${referenceRect.height}px`;
    } else {
      _inactive(style);
    }
  }, [active]);
  const onend = () => (isPendingTransition.current = false);
  return h(
    "div",
    _util.extend(
      {
        ontransitionstart: () => (isPendingTransition.current = true),
        ontransitioncancel: onend,
        ontransitionend: onend,
        ref,
        children,
        class: klass,
        "data-is-active": `${active}`,
      },
      rest
    ) as any
  );
}

export function useCollapse(initial?: boolean) {
  return useToggleState(initial);
}
