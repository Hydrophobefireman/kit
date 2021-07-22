import { BaseElement, _util } from "@hydrophobefireman/kit";
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
  className,
  ...rest
}: BaseElement<TransitionProps>) {
  const isFirstRender = useRef(true);
  const [renderState, setRenderState] = useState<RenderState | null>(null);
  const [child, setChild] = useState(() => render);
  const nextChildRef = useLatestRef(render);
  const currentChildRef = useLatestRef(child);
  function scheduleNextChild() {
    setRenderState("INITIAL");
    setChild(() => nextChildRef.current);
  }
  function nextRenderState() {
    switch (renderState) {
      case "INITIAL":
        return currentChildRef.current && setRenderState("IDLE");
      case "UNMOUNT":
        scheduleNextChild();
        return;
      case "IDLE":
      default:
        return;
    }
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return setRenderState("INITIAL");
    }
    if (!currentChildRef.current) {
      scheduleNextChild();
    } else {
      setRenderState("UNMOUNT");
    }
  }, [id]);
  return h(
    BaseDom,
    _util.extend(
      {
        id,
        element: as || "div",
        onTransitionEnd: nextRenderState,
        onTransitionCancel: nextRenderState,
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
