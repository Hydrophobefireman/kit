//@ts-nocheck
// transition.css-events has some issues with
// multiple firing events
// this implementation is inspired by geist ui
import {BaseElement, _util} from "@hydrophobefireman/kit";
import {BaseDom} from "@hydrophobefireman/kit/base-dom";
import * as classnames from "@hydrophobefireman/kit/classnames";
import {useLatestRef, useMedia} from "@hydrophobefireman/kit/hooks";
import {h, useEffect, useState} from "@hydrophobefireman/ui-lib";

import {RenderState, TransitionProps} from "./types";

export function Transition({
  render,
  visible,
  as,
  enterClass,
  idleClass,
  leaveClass,
  id,
  enterTime = 50,
  leaveTime = 50,
  clearTime = 300,
  class: cls,
  className,
  children,
  transitionHook,
  ...props
}: BaseElement<TransitionProps>) {
  const [transitionState, setTransitionState] = useState<RenderState | null>(
    null
  );
  const times = useLatestRef({enterTime, leaveTime, clearTime});
  const prm = useLatestRef(useMedia.usePrefersReducedMotion());
  const transitionHookRef = useLatestRef(transitionHook);
  const [renderState, setRenderState] = useState(() => render);
  useEffect(() => {
    if (prm.current) {
      // no animations. just skip to the content
      return setRenderState(render);
    }
    const {enterTime, leaveTime, clearTime} = times.current;
    const nextState: RenderState = visible ? "INITIAL" : "UNMOUNT";
    const time = visible ? enterTime : leaveTime;
    let didSync = false;
    const _sync = () => {
      setRenderState(visible ? () => render : null);
      didSync = true;
    };
    if (visible) {
      _sync();
    }
    const animTimer = setTimeout(() => {
      setTransitionState(nextState);
      clearTimeout(animTimer);
    }, time);

    const finishTimer = setTimeout(() => {
      setTransitionState("IDLE");
      clearTimeout(finishTimer);
      if (!visible) {
        _sync();
      }
      const transitionHook = transitionHookRef.current;
      transitionHook && transitionHook(null as any, "DONE");
    }, time + clearTime);
    return () => {
      clearTimeout(animTimer);
      clearTimeout(finishTimer);
      if (!didSync) setRenderState(() => render);
    };
  }, [visible, render]);
  const isHidden = !renderState;
  const css = isHidden ? {transition: "0.0001s"} : null;

  return h(
    BaseDom,
    _util.extend(
      {
        style: css,
        id,
        element: as || "div",
        class: [
          cls,
          className,
          classnames.transitionRoot,
          {
            [enterClass || ""]: transitionState === "INITIAL",
            [idleClass || ""]: transitionState === "IDLE",
            [leaveClass || ""]: transitionState === "UNMOUNT",
          },
        ],
      },
      props
    ) as any,
    isHidden
      ? null
      : typeof renderState === "function"
      ? h(renderState)
      : renderState
  );
}
