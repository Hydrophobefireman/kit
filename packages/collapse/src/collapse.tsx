import { BaseElement, _util } from "@hydrophobefireman/kit";
import * as classnames from "@hydrophobefireman/kit/classnames";
import {
  useFwdRef,
  useLatestRef,
  useRect,
  useResize,
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
  function update(isPendingResizeUpdate?: boolean) {
    let referenceRect = rectRef.current;
    const style = ref.current && ref.current.style;
    if (isPendingTransition.current || isPendingResizeUpdate) {
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
  }
  useLayoutEffect(update, [active]);
  useResize(() => update(true));
  const onend = () => {
    isPendingTransition.current = false;
    const { current } = ref;
    if (!active) return;

    current.style.height = "auto";
    _util.raf(
      () =>
        (current.style.height = `${current.getBoundingClientRect().height}px`)
    );
  };
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
