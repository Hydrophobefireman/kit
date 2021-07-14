import { BaseElement, _util, useIsPending } from "@hydrophobefireman/kit";
import { BaseDom } from "@hydrophobefireman/kit/base-dom";
import * as classnames from "@hydrophobefireman/kit/classnames";
import { Spinner } from "@hydrophobefireman/kit/loading";
import { A, h } from "@hydrophobefireman/ui-lib";

import { ButtonProps } from "./types";

const variantClassMap = new Map<ButtonProps["variant"], string>([
  ["custom", classnames.buttonCustom],
  ["normal", classnames.buttonNormal],
  ["shadow", classnames.buttonShadow],
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
    ...rest
  } = props;
  _util.guardCss(style);
  _util.guardExists(label, "Provide a label for your buttons");
  const styleObject: any = Object.assign({ alignItems: "center" }, style);

  if (foreground) {
    styleObject["--kit-foreground"] = foreground;
  }
  if (background) {
    styleObject["--kit-background"] = background;
  }
  const isLink = !!rest.href;
  const element = isLink ? getLinkElement(rest.href) : "button";

  return (
    <BaseDom
      element={element}
      aria-label={label}
      class={[
        cls,
        className,
        classnames.button,
        variantClassMap.get(variant),
        modeClassMap.get(mode),
        isLink && classnames.link,
      ]}
      style={styleObject}
      flex
      {...rest}
    >
      {prefix && (
        <BaseDom element="span" flex>
          {prefix}
        </BaseDom>
      )}
      <BaseDom element="span" flex>
        {children}
      </BaseDom>
      {suffix && (
        <BaseDom element="span" flex>
          {suffix}
        </BaseDom>
      )}
    </BaseDom>
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
    return (
      <BaseButton
        prefix={<Spinner />}
        kit-disabled
        aria-hidden
        class={[cls, className, classnames.noEvents]}
        {..._util.removeEventsFromProps(rest)}
      />
    );
  }
  return h(BaseButton, props as any);
}

export function Button(props: BaseElement<ButtonProps>) {
  const { depends, ...rest } = props;
  if (depends) return h(DependantButton, rest as any);
  return h(BaseButton, rest as any);
}
