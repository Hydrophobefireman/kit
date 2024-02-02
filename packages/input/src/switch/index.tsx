import {BaseElement, _util} from "@hydrophobefireman/kit";
import {BaseDom} from "@hydrophobefireman/kit/base-dom";
import * as classnames from "@hydrophobefireman/kit/classnames";
import {Box} from "@hydrophobefireman/kit/container";
import {usePairedId} from "@hydrophobefireman/kit/hooks";
import {h, useState} from "@hydrophobefireman/ui-lib";

import {SwitchProps} from "./types";

export * from "./types";

const switchClassnameMap = new Map([
  ["enabled", classnames.switchActive],
  ["disabled", classnames.switchInactive],
]);
export function Switch({
  checked,
  errored,
  inline,
  id,
  class: cls,
  className,
  label,
  labelStyle,
  width,
  height,
  ...rest
}: BaseElement<SwitchProps>) {
  const [inputId, labelId] = usePairedId(id);
  _util.guardCss(labelStyle);
  const _labelStyle = {};
  if (width) {
    _labelStyle["--kit-switch-width"] = width;
  }
  if (height) {
    _labelStyle["--kit-switch-height"] = height;
  }
  return (
    <label
      id={labelId}
      style={_util.extend(_labelStyle, labelStyle)}
      class={_util.createClassProp([cls, className])}
    >
      <input
        checked={checked}
        id={inputId}
        class={classnames.switchInput}
        type="checkbox"
        {...rest}
      />
      {label}
    </label>
  );
}
export function _Switch({
  errored,
  inline,
  id,
  class: cls,
  className,
  labelStyle,
  disabled,
  label,
  width,
  height,
  ...rest
}: BaseElement<SwitchProps>) {
  let state = "";
  let labelClass = cls;
  _util.guardCss(labelStyle);
  const [inputId, labelId] = usePairedId(id);
  const checked = state === "enabled";
  const _labelStyle = {};
  if (width) {
    _labelStyle["--kit-switch-width"] = width;
  }
  if (height) {
    _labelStyle["--kit-switch-height"] = height;
  }
  return (
    <Box
      row
      vertical="center"
      element="label"
      class={[
        classnames.relInputLabel,
        labelClass,
        errored && classnames.switchIsInvalid,
      ]}
      data-value={state}
      inlineFlex
      for={inputId}
      id={labelId}
      style={_util.extend(_labelStyle, labelStyle)}
    >
      {h(
        BaseDom,
        _util.extend(
          {
            element: "input",
            type: "checkbox",
            id: inputId,
            checked: checked,
            class: [classnames._switchInputHidden, cls, className],
            tabindex: 0,
            "aria-checked": checked,
            "aria-labelledBy": labelId,
            "aria-errored": errored,
            disabled,
          },
          rest,
        ),
      )}
      <BaseDom
        element="span"
        disabled={disabled}
        aria-hidden
        class={[switchClassnameMap.get(state)]}
      />
      <span class={classnames.srOnly}>{label}</span>
    </Box>
  );
}
