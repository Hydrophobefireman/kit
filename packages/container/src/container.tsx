import {_util} from "@hydrophobefireman/kit";
import {BaseDom} from "@hydrophobefireman/kit/base-dom";
import * as classnames from "@hydrophobefireman/kit/classnames";
import {forwardRef, h} from "@hydrophobefireman/ui-lib";

import {
  ContainerProps,
  GenericContainerProps,
  InternalContainerProps,
} from "./types";

const alignmentMap = new Map<
  GenericContainerProps["horizontal"] | GenericContainerProps["vertical"],
  string
>([
  ["left", "flex-start"],
  ["right", "flex-end"],
  ["top", "flex-start"],
  ["center", "center"],
  ["bottom", "flex-end"],
]);

function BaseContainer({
  element = "div",
  row,
  style,
  flex,
  horizontal = "center",
  vertical = "center",
  class: klass,
  className,
  inlineFlex,
  __$ref,
  ...rest
}: InternalContainerProps) {
  _util.guardCss(style);
  const verticalAlignment = alignmentMap.get(vertical);
  const horizontalAlignment = alignmentMap.get(horizontal);
  const css = _util.extend(
    {
      "--kit-flex-direction": row ? "row" : "column",
      "--kit-justify-content": row ? horizontalAlignment : verticalAlignment,
      "--kit-align-items": row ? verticalAlignment : horizontalAlignment,
      "--kit-flex": _util.nullOr(flex, "unset"),
    },
    style as any
  );
  return h(
    BaseDom,
    _util.extend(
      {
        ref: __$ref,
        element,
        flex: inlineFlex ? undefined : true,
        inlineFlex: inlineFlex || undefined,
        style: css,
        class: [classnames.container, klass, className],
      },
      rest
    )
  );
}

export const Box = forwardRef<ContainerProps>(function Box(
  _props: ContainerProps,
  ref
) {
  const props = _util.extend(_props, {__$ref: ref});
  return h(BaseContainer, props as any);
});
