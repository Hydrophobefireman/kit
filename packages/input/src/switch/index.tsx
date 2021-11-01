import { BaseElement, _util } from "@hydrophobefireman/kit";
import { BaseDom } from "@hydrophobefireman/kit/base-dom";
import * as classnames from "@hydrophobefireman/kit/classnames";
import { Box } from "@hydrophobefireman/kit/container";
import { useLabelId } from "@hydrophobefireman/kit/hooks";
import { h, useState } from "@hydrophobefireman/ui-lib";

import { SwitchProps } from "./types";

export * from "./types";

const switchClassnameMap = new Map([
  ["enabled", classnames.switchActive],
  ["disabled", classnames.switchInactive],
  ["intermediate", classnames.switchIntermediate],
]);
export function Switch({
  state,
  labelClass,
  errored,
  inline,
  id,
  class: cls,
  className,
  depends,
  labelStyle,
  disabled,
  label,
  width,
  height,
  ...rest
}: BaseElement<SwitchProps>) {
  _util.guardCss(labelStyle);
  const [inputId, labelId] = useLabelId(id);
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
        classnames.switchLabel,
        classnames.relInputLabel,
        labelClass,
        errored && classnames.switchIsInvalid,
      ]}
      data-value={state}
      inlineFlex
      for={inputId}
      id={labelId}
      depends={depends}
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
          rest
        )
      )}
      <BaseDom
        element="span"
        disabled={disabled}
        aria-hidden
        class={[classnames.switchIndicator, switchClassnameMap.get(state)]}
      />
      <span class={classnames.srOnly}>{label}</span>
    </Box>
  );
}

export function useSwitch(state: SwitchProps["state"]) {
  const [currentState, setState] = useState<SwitchProps["state"]>(state);
  function toggle() {
    setState(currentState !== "enabled" ? "enabled" : "disabled");
  }
  return { currentState, toggle, setState };
}
