import {BaseDomProps, OptionalPick, _util} from "@hydrophobefireman/kit";
import {BaseDom} from "@hydrophobefireman/kit/base-dom";
import * as classnames from "@hydrophobefireman/kit/classnames";

export function Skeleton({
  children,
  className,
  class: cls,
  style,
}: OptionalPick<BaseDomProps, "children" | "class" | "className" | "style">) {
  _util.guardCss(style);
  return (
    <BaseDom
      aria-hidden
      inlineBlock
      className={[className, cls, classnames.noEvents]}
      style={_util.extend({position: "relative"}, style)}
    >
      <span class={classnames.skeletonWrapper}>{children}</span>
    </BaseDom>
  );
}
