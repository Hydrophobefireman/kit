import { BaseElement, DOMElements, _util } from "@hydrophobefireman/kit";
import { BaseDom } from "@hydrophobefireman/kit/base-dom";
import * as classnames from "@hydrophobefireman/kit/classnames";
import { useLatestRef } from "@hydrophobefireman/kit/hooks";
import { h, useEffect, useRef, useState } from "@hydrophobefireman/ui-lib";

import { RenderState, TransitionProps } from "./types";

export function Transition({
  id,
  render,
  enterClass,
  idleClass,
  leaveClass,
  as,
  class: cls,
  children,
  className,
  style,
  transitionTargets,
  transitionHook,
  dom,
  ...rest
}: BaseElement<TransitionProps>) {
  const isFirstRender = useRef(true);
  const [renderState, setRenderState] = useState<RenderState | null>(null);
  const [child, setChild] = useState(() => render);
  const nextChildRef = useLatestRef(render);
  const currentChildRef = useLatestRef(child);
  const transitionTargetRef = useLatestRef(transitionTargets);
  function scheduleNextChild() {
    setRenderState(nextChildRef.current ? "INITIAL" : "UNMOUNT");
    currentChildRef.current = nextChildRef.current;
    setChild(() => nextChildRef.current);
  }

  function nextRenderState(e: TransitionEvent, mode: "DONE" | "CANCEL") {
    if (
      e.target === e.currentTarget &&
      !(transitionTargetRef.current || []).includes(e.target as HTMLElement)
    )
      return;
    transitionHook && _util.raf(() => transitionHook(e, mode));
    switch (renderState) {
      case "INITIAL":
        return setRenderState("IDLE");
      case "UNMOUNT":
        scheduleNextChild();
        return;
      case "IDLE":
      default:
        return;
    }
  }
  useEffect(() => {
    if (render) {
      if (render !== currentChildRef.current) {
        setChild(() => render);
      }
    }
  }, [render]);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return setRenderState(nextChildRef.current ? "INITIAL" : "UNMOUNT");
    }
    if (!nextChildRef.current) return setRenderState("UNMOUNT");
    scheduleNextChild();
  }, [id]);

  const css = _util.extend(
    {},
    style,
    !child ? { transition: "0.0001s" } : null
  );
  return h(
    BaseDom,
    _util.extend(
      {
        dom,
        style: css,
        id,
        element: as || "div",
        onTransitionEnd: (e) => nextRenderState(e, "DONE"),
        onTransitionCancel: (e) => nextRenderState(e, "CANCEL"),
        class: [
          cls,
          className,
          classnames.transitionRoot,
          {
            [enterClass || ""]: renderState === "INITIAL",
            [idleClass || ""]: renderState === "IDLE",
            [leaveClass || ""]: renderState === "UNMOUNT",
          },
        ],
      },
      rest
    ) as any,
    typeof child === "function" ? h(child) : child
  );
}
