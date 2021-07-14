import * as classnames from "@hydrophobefireman/kit/classnames";

type DisplayProps =
  | "block"
  | "inline"
  | "inlineBlock"
  | "flex"
  | "grid"
  | "inlineFlex"
  | "none";

export const displayModeMap = /* #__PURE__ */ new Map<DisplayProps, string>([
  ["block", classnames.block],
  ["inline", classnames.inline],
  ["inlineBlock", classnames.inlineBlock],
  ["flex", classnames.flex],
  ["inlineFlex", classnames.inlineFlex],
  ["grid", classnames.grid],
]);
export const displayProps = /* #__PURE__ */ Array.from(
  /* #__PURE__ */ displayModeMap.keys()
);

const selfClosingTags = /* #__PURE__ */ new Set(
  /* #__PURE__ */ "area base br col embed hr img input keygen link meta param source track wbr".split(
    " "
  )
);

export function isSelfClosingElement(e: any) {
  return typeof e === "string" && selfClosingTags.has(e);
}
