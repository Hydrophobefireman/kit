import { BaseDomProps, _util } from "@hydrophobefireman/kit";
import { h, useRef } from "@hydrophobefireman/ui-lib";

import { displayModeMap, displayProps, isSelfClosingElement } from "./util";

const { createClassProp, onlyOneProp, applyRef } = _util;

export function BaseDom(props: BaseDomProps) {
  const {
    element,
    class: klass,
    className,
    depends,
    dom,
    disabled,
    ...rest
  } = props;
  if (depends !== undefined) {
    throw new TypeError(
      "This component does not know how to render skeleton views! " +
        "Write your custom implementation or use a different component"
    );
  }
  const displayMode =
    onlyOneProp(displayProps, props, "Multiple display props provided!") ||
    "flex";
  const ref = useRef<any>();
  applyRef(dom, ref.current);
  const cls = createClassProp([
    displayModeMap.get(displayMode),
    klass,
    className,
  ]);
  const el = element || "div";
  const {
    block,
    inline,
    inlineBlock,
    flex,
    inlineFlex,
    grid,
    none,
    style,
    children,
    ...filteredProps
  } = rest;
  return h(
    el,
    Object.assign(
      {
        class: cls,
        style: style as {},
        ref,
        disabled,
        children: isSelfClosingElement(el) ? null : children,
        "kit-disabled": disabled,
      },
      filteredProps
    )
  );
}
