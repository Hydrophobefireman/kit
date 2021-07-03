import * as classnames from "@hydrophobefireman/kit/classnames";

import { BaseDomProps, _util } from "@hydrophobefireman/kit";
import { h, useRef } from "@hydrophobefireman/ui-lib";

const { createClassProp, onlyOneProp, warn } = _util;

type DisplayProps =
  | "block"
  | "inline"
  | "inlineBlock"
  | "flex"
  | "grid"
  | "inlineFlex"
  | "none";

const displayModeMap = new Map<DisplayProps, string>([
  ["block", classnames.block],
  ["inline", classnames.inline],
  ["inlineBlock", classnames.inlineBlock],
  ["flex", classnames.flex],
  ["inlineFlex", classnames.inlineFlex],
  ["grid", classnames.grid],
]);
const displayProps = /* #__PURE__ */  Array.from(displayModeMap.keys());
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
      "This component does not know how to render skeleton views! Write your custom implementation or use a different component"
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

  const {
    block,
    inline,
    inlineBlock,
    flex,
    inlineFlex,
    grid,
    none,
    style,
    ...filteredProps
  } = rest;
  return h(element || "div", {
    class: cls,
    ...filteredProps,
    style: style as {},
    ref,
    disabled,
    "kit-disabled": disabled,
  });
}

function applyRef(ref: any, value: any) {
  if (!ref) return;
  if (typeof ref === "function")
    return warn(
      ref(value),
      "Using function as an element's dom ref might cause it to be called multiple times on each render"
    );
  ref.current = value;
}
