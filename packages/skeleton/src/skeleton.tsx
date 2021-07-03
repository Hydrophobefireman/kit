import * as classnames from "@hydrophobefireman/kit/classnames";

import { BaseDomProps, OptionalPick, _util } from "@hydrophobefireman/kit";

import { BaseDom } from "@hydrophobefireman/kit/base-dom";

export function Skeleton({
  children,
  className,
  class: cls,
  style,
}: OptionalPick<BaseDomProps, "children" | "class" | "className" | "style">) {
  _util.guardCss(style);
  return (
    <BaseDom
      class={classnames.noEvents}
      className={_util.createClassProp([className, cls])}
      style={{ ...(style as any), position: "relative" }}
    >
      <span class={classnames.skeletonWrapper}>{children}</span>
    </BaseDom>
  );
}
