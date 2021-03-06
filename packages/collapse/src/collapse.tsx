import {BaseElement, _util} from "@hydrophobefireman/kit";
import * as classnames from "@hydrophobefireman/kit/classnames";
import {
  useLatestRef,
  useRect,
  useResize,
  useToggleState,
} from "@hydrophobefireman/kit/hooks";
import {
  RefType,
  forwardRef,
  h,
  useLayoutEffect,
  useRef,
} from "@hydrophobefireman/ui-lib";

function _inactive(style: CSSStyleDeclaration) {
  if (style) {
    style.height = "0px";
    style.overflow = "hidden";
  }
}
export const Collapse = forwardRef<BaseElement<{active?: boolean}>>(
  function Collapse(
    {
      children,
      active,
      class: cls,
      className,
      ...rest
    }: BaseElement<{active?: boolean}>,
    ref: RefType<any>
  ) {
    const klass = [className, cls, classnames.collapse];
    const $internalRef = useRef<HTMLDivElement>();
    const {rect, sync} = useRect($internalRef);
    const rectRef = useLatestRef(rect);
    const firstRender = useRef(true);
    const isPendingTransition = useRef(false);
    function update() {
      let referenceRect = rectRef.current;
      const style = $internalRef.current && $internalRef.current.style;
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
    }
    useLayoutEffect(update, [active]);
    function latestHeight() {
      const {current} = $internalRef;
      if (current && current.style)
        current.style.height = `${current.getBoundingClientRect().height}px`;
    }
    useResize(
      () =>
        active &&
        $internalRef.current &&
        ($internalRef.current.style.height = "auto") &&
        _util.raf(
          _util.buildRaf(() => {
            sync();
            latestHeight();
          })
        )
    );
    const onend = () => {
      isPendingTransition.current = false;
      const {current} = $internalRef;
      if (!active) return;
      if (current && current.style) {
        current.style.height = "auto";
        _util.raf(latestHeight);
      }
    };
    const commonRef = _util.useSyncedRefs(ref, $internalRef);
    return h(
      "div",
      _util.extend(
        {
          ontransitionstart: () => (isPendingTransition.current = true),
          ontransitioncancel: onend,
          ontransitionend: onend,
          ref: commonRef,
          children,
          class: klass,
          "data-is-active": `${active}`,
        },
        rest
      ) as any
    );
  }
);

export function useCollapse(initial?: boolean) {
  return useToggleState(initial);
}
