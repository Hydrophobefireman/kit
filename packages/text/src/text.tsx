import { Properties } from "csstype";

import { BaseElement, _util, useIsPending } from "@hydrophobefireman/kit";
import { Skeleton } from "@hydrophobefireman/kit/skeleton";
import { h } from "@hydrophobefireman/ui-lib";

import { TextAs, TextProps } from "./types";

function BaseText({
  as = "p",
  size,
  weight,
  transform,
  align,
  color,
  children,
  style,
  noMargin,
  ...rest
}: BaseElement<TextProps>) {
  const css: Properties = {};
  align && (css.textAlign = align);
  size && (css.fontSize = _util.toPx(size));
  weight && (css.fontWeight = weight);
  color && (css.color = `var(--${color})`);
  transform && (css.textTransform = transform);
  noMargin && (css.margin = 0);
  const C = as;
  return h(
    C,
    _util.extend({ style: _util.extend(css, style), children }, rest)
  );
}
function DependantText(props: BaseElement<TextProps>) {
  const { isPending } = useIsPending();
  if (isPending)
    return (
      <Skeleton>
        {h(
          BaseText,
          _util.extend(_util.removeEventsFromProps(props), {
            children: "Loading..",
          }) as any
        )}
      </Skeleton>
    );
  return h(BaseText, props as any);
}

export function Text({ depends, ...props }: BaseElement<TextProps>) {
  if (depends) return h(DependantText, props as any);
  return h(BaseText, props as any);
}

function createTextComponent<T extends TextAs>(x: T) {
  return function (props: Omit<BaseElement<TextProps>, "as">) {
    return h(Text, _util.extend({}, props, { as: x }) as any);
  };
}

Text.b = createTextComponent("b");
Text.div = createTextComponent("div");
Text.em = createTextComponent("em");
Text.h1 = createTextComponent("h1");
Text.h2 = createTextComponent("h2");
Text.h3 = createTextComponent("h3");
Text.h4 = createTextComponent("h4");
Text.h5 = createTextComponent("h5");
Text.h6 = createTextComponent("h6");
Text.i = createTextComponent("i");
Text.label = createTextComponent("label");
Text.p = createTextComponent("p");
Text.small = createTextComponent("small");
Text.span = createTextComponent("span");
Text.strong = createTextComponent("strong");
Text.u = createTextComponent("u");
