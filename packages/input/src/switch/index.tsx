import { BaseElement, _util } from "@hydrophobefireman/kit";
import { BaseDom } from "@hydrophobefireman/kit/base-dom";
import * as classnames from "@hydrophobefireman/kit/classnames";
import { Container } from "@hydrophobefireman/kit/container";
import { useLabelId } from "@hydrophobefireman/kit/hooks";
import { h, useState } from "@hydrophobefireman/ui-lib";

import { SwitchProps } from "./types";

export * from "./types";

export function Switch({
  state,
  labelClass,
  errored,
  inline,
  id,
  class: cls,
  className,
  depends,
  disabled,
  ...rest
}: BaseElement<SwitchProps>) {
  const [inputId, labelId] = useLabelId(id);
  const checked = state === "enabled";
  return (
    <Container
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
        class={[
          classnames.switchIndicator,
          {
            [classnames.switchActive]: checked,
            [classnames.switchInactive]: state === "disabled",
            [classnames.switchIntermediate]: state === "intermediate",
          },
        ]}
      />
    </Container>
  );
}

export function useSwitch(state: SwitchProps["state"]) {
  const [currentState, setState] = useState<SwitchProps["state"]>(state);
  function toggle() {
    setState(
      currentState === "disabled" || currentState === "intermediate"
        ? "enabled"
        : "disabled"
    );
  }
  return [currentState, toggle, setState] as const;
}
