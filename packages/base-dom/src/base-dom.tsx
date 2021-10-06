import { BaseDomProps, _util } from "@hydrophobefireman/kit";
import { h } from "@hydrophobefireman/ui-lib";

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
    onlyOneProp(displayProps, props, "Multiple display props provided!") || "";

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
    _util.extend(
      {
        class: cls,
        style: style as {},
        ref: dom && ((r) => applyRef(dom, r)),
        disabled,
        children: isSelfClosingElement(el) ? null : children,
        "kit-disabled": disabled,
      },
      filteredProps
    )
  );
}
