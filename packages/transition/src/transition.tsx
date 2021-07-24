import { BaseElement, _util } from "@hydrophobefireman/kit";
import { BaseDom } from "@hydrophobefireman/kit/base-dom";
import * as classnames from "@hydrophobefireman/kit/classnames";
import { useLatestRef } from "@hydrophobefireman/kit/hooks";
import {
  h,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "@hydrophobefireman/ui-lib";

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
  ...rest
}: BaseElement<TransitionProps>) {
  const isFirstRender = useRef(true);
  const [renderState, setRenderState] = useState<RenderState | null>(null);
  const [child, setChild] = useState(() => render);
  const nextChildRef = useLatestRef(render);
  const currentChildRef = useLatestRef(child);
  function scheduleNextChild() {
    setRenderState(nextChildRef.current ? "INITIAL" : "UNMOUNT");
    currentChildRef.current = nextChildRef.current;
    setChild(() => nextChildRef.current);
  }

  function nextRenderState() {
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
        style: css,

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
