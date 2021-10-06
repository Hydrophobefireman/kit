import { BaseElement, _util, useIsPending } from "@hydrophobefireman/kit";
import { BaseDom } from "@hydrophobefireman/kit/base-dom";
import * as classnames from "@hydrophobefireman/kit/classnames";
import { SpinnerIcon } from "@hydrophobefireman/kit/icons";
import { A, h } from "@hydrophobefireman/ui-lib";

import { ButtonProps } from "./types";

const variantClassMap = new Map<ButtonProps["variant"], string>([
  ["custom", classnames.buttonCustom],
  ["normal", `${classnames.buttonNormal} ${classnames.ripple}`],
  ["shadow", `${classnames.buttonShadow} ${classnames.ripple}`],
]);

const modeClassMap = new Map<ButtonProps["mode"], string>([
  ["alert", classnames.buttonAlert],
  ["error", classnames.buttonError],
  ["secondary", classnames.buttonSecondary],
  ["success", classnames.buttonSuccess],
  ["voilet", classnames.buttonVoilet],
  ["warning", classnames.buttonWarning],
]);

function BaseButton(props: BaseElement<ButtonProps>) {
  const {
    depends,
    class: cls,
    className,
    foreground,
    background,
    style,
    label,
    mode,
    children,
    prefix,
    suffix,
    variant,
    preserveScroll,
    innerContentClass,
    prefixClass,
    suffixClass,
    ...rest
  } = props;
  _util.guardCss(style);
  _util.guardExists(label, "Provide a label for your buttons");
  const styleObject: any = _util.extend({ alignItems: "center" }, style);

  if (foreground) {
    styleObject["--kit-foreground"] = foreground;
  }
  if (background) {
    styleObject["--kit-background"] = background;
  }
  const href = rest.href;
  const isLink = !!href;
  const element = isLink ? getLinkElement(href!) : "button";
  const cVnodes = (
    <>
      {prefix && (
        <BaseDom element="span" flex class={prefixClass}>
          {prefix}
        </BaseDom>
      )}
      <BaseDom element="span" flex class={innerContentClass}>
        {children}
      </BaseDom>
      {suffix && (
        <BaseDom element="span" flex class={suffixClass}>
          {suffix}
        </BaseDom>
      )}
    </>
  );
  return h(
    BaseDom,
    _util.extend(
      {
        element,
        "aria-label": label,
        class: [
          cls,
          className,
          classnames.button,
          variantClassMap.get(variant),
          modeClassMap.get(mode),
          isLink && classnames.link,
        ],
        style: styleObject,
        flex: true,
      },
      element === A ? { preserveScroll } : null,
      rest
    ) as any,
    cVnodes
  );
}

function getLinkElement(href: string) {
  return _util.isSameOrigin(href) ? A : "a";
}
function DependantButton(props: BaseElement<ButtonProps>) {
  const { isPending, resourceName } = useIsPending();
  if (isPending) {
    if (props.skeleton) {
      return props.skeleton(resourceName);
    }
    const { class: cls, className, prefix: _, ...rest } = props;
    return h(
      BaseButton,
      _util.extend(
        {
          prefix: <SpinnerIcon />,
          disabled: true,
          "aria-hidden": true,
          class: [cls, className, classnames.noEvents],
        },
        _util.removeEventsFromProps(rest)
      ) as any
    );
  }
  return h(BaseButton, props as any);
}

export function Button(props: BaseElement<ButtonProps>) {
  const { depends, ...rest } = props;
  if (depends) return h(DependantButton, rest as any);
  return h(BaseButton, rest as any);
}
