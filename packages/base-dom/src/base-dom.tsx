import {BaseDomProps, _util} from "@hydrophobefireman/kit";
import {forwardRef, h} from "@hydrophobefireman/ui-lib";

import {displayModeMap, displayProps, isSelfClosingElement} from "./util";

const {createClassProp, onlyOneProp} = _util;

export const BaseDom = forwardRef<BaseDomProps>(function BaseDom(
  props: BaseDomProps,
  ref
) {
  const {element, class: klass, className, disabled, ...rest} = props;
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
        ref,
        class: cls,
        style: style as {},
        disabled,
        children: isSelfClosingElement(el) ? null : children,
        "kit-disabled": disabled,
      },
      filteredProps
    )
  );
});
