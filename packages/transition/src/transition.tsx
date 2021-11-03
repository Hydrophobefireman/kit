import {BaseElement, _util} from "@hydrophobefireman/kit";
import {BaseDom} from "@hydrophobefireman/kit/base-dom";
import * as classnames from "@hydrophobefireman/kit/classnames";
import {useLatestRef} from "@hydrophobefireman/kit/hooks";
import {
  forwardRef,
  h,
  useEffect,
  useRef,
  useState,
} from "@hydrophobefireman/ui-lib";

import {RenderState, TransitionProps} from "./types";

export const Transition = forwardRef<BaseElement<TransitionProps>>(
  function Transition(
    {
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
      ...rest
    }: BaseElement<TransitionProps>,
    ref
  ) {
    const isFirstRender = useRef(true);
    const [renderState, setRenderState] = useState<RenderState | null>(null);
    const [child, setChild] = useState(() => render);
    const nextChildRef = useLatestRef(render);
    const currentChildRef = useLatestRef(child);
    const transitionTargetRef = useLatestRef(transitionTargets);

    const unmountTimerRef = useRef<number>();
    const initialMountTimerRef = useRef<number>();

    function __unmount() {
      clearTimeout(unmountTimerRef.current);
      currentChildRef.current = nextChildRef.current;
      setChild(() => nextChildRef.current);
    }

    function __mount() {
      clearTimeout(initialMountTimerRef.current);
      return setRenderState("IDLE");
    }
    function scheduleNextChild() {
      setRenderState(nextChildRef.current ? "INITIAL" : "UNMOUNT");
      __unmount();
    }

    function nextRenderState(e: TransitionEvent, mode: "DONE" | "CANCEL") {
      if (
        e.target !== e.currentTarget &&
        !(transitionTargetRef.current || []).includes(e.target as HTMLElement)
      )
        return;
      transitionHook && _util.raf(() => transitionHook(e, mode));
      switch (renderState) {
        case "INITIAL":
          return __mount();
        case "UNMOUNT":
          return scheduleNextChild();
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
    useEffect(() => {
      if (renderState === "UNMOUNT") {
        // this timeout is in case we
        // hit a weird race condition where
        // the component has not unmountede
        // probably happens when you toggle between
        // active states multiple times at once
        // so we unmount the component ourselves as a measure
        clearTimeout(unmountTimerRef.current);
        unmountTimerRef.current = setTimeout(() => __unmount(), 2000) as any;
      } else if (renderState === "INITIAL" || renderState === null) {
        clearTimeout(initialMountTimerRef.current);
        if (nextChildRef.current) {
          initialMountTimerRef.current = setTimeout(
            () => __mount(),
            1000
          ) as any;
        } else {
          scheduleNextChild();
        }
      }
    }, [renderState]);
    const css = _util.extend(
      {},
      style,
      !child ? {transition: "0.0001s"} : null
    );
    return h(
      BaseDom,
      _util.extend(
        {
          ref,
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
);
