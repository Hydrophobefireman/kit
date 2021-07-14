import { BaseDomProps, OptionalPick, _util } from "@hydrophobefireman/kit";
import { BaseDom } from "@hydrophobefireman/kit/base-dom";
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
      class={classnames.noEvents}
      className={_util.createClassProp([className, cls])}
      style={{ ...(style as any), position: "relative" }}
    >
      <span class={classnames.skeletonWrapper}>{children}</span>
    </BaseDom>
  );
}
