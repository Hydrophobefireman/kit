import { _util, useIsPending } from "@hydrophobefireman/kit";
import { BaseDom } from "@hydrophobefireman/kit/base-dom";
import * as classnames from "@hydrophobefireman/kit/classnames";
import { Skeleton } from "@hydrophobefireman/kit/skeleton";
import { h } from "@hydrophobefireman/ui-lib";

import { ContainerProps, GenericContainerProps } from "./types";

const alignmentMap = new Map<
  GenericContainerProps["horizontal"] | GenericContainerProps["vertical"],
  string
>([
  ["left", "flex-start"],
  ["right", "flex-start"],
  ["top", "flex-start"],
  ["center", "center"],
  ["bottom", "flex-end"],
]);

function IndependantContainer({
  element = "div",
  row,
  style,
  flex,
  horizontal = "center",
  vertical = "center",
  class: klass,
  className,
  ...rest
}: ContainerProps) {
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
        element,
        flex: true,
        style: css,
        class: [classnames.container, klass, className],
      },
      rest
    )
  );
}

function DependantContainer(props: ContainerProps) {
  const { isPending, resourceName } = useIsPending();

  if (isPending)
    return props.skeleton ? (
      props.skeleton(resourceName)
    ) : (
      <Skeleton
        class={props.class}
        className={props.className}
        style={props.style}
      >
        {h(IndependantContainer, _util.removeEventsFromProps(props) as any)}
      </Skeleton>
    );
  return h(IndependantContainer, props as any);
}

export function Container({ depends, ...props }: ContainerProps) {
  if (depends) return h(DependantContainer, props as any);
  return h(IndependantContainer, props as any);
}
