import { BaseElement, _util } from "@hydrophobefireman/kit";
import { BaseDom } from "@hydrophobefireman/kit/base-dom";
import * as classnames from "@hydrophobefireman/kit/classnames";
import { Box } from "@hydrophobefireman/kit/container";
import { useLabelId, useToggleState } from "@hydrophobefireman/kit/hooks";
import { Text } from "@hydrophobefireman/kit/text";
import { h } from "@hydrophobefireman/ui-lib";

import { CheckboxProps } from "./types";

export function Checkbox({
  checked,
  onCheck,
  boxClass,
  children,
  inline,
  errored,
  boxStyle,
  class: cls,
  className,
  depends,
  size,
  disabled,
  id,
  ...rest
}: BaseElement<CheckboxProps>) {
  _util.guardCss(boxStyle);
  const [inputId, labelId] = useLabelId(id);
  const labelStyle = {};
  if (size) {
    labelStyle["--kit-checkbox-size"] = size;
  }
  return (
    <Box
      inlineFlex={inline}
      row
      disabled={disabled}
      depends={depends}
      vertical="center"
      element="label"
      class={[
        classnames.relInputLabel,
        boxClass,
        { [classnames.checkboxIsInvalid]: errored },
      ]}
      style={_util.extend(labelStyle, boxStyle)}
      for={inputId}
      id={labelId}
    >
      {h(
        BaseDom,
        _util.extend(
          {
            element: "input",
            onInput: (e) =>
              onCheck((e.currentTarget as HTMLInputElement).checked),
            checked,
            disabled,
            class: [classnames._checkboxInputHidden, cls, className],
            type: "checkbox",
            "aria-checked": checked,
            "aria-labelledby": labelId,
            "aria-invalid": errored,
          },
          rest
        )
      )}
      <span
        class={[
          classnames.checkboxIconContainer,
          checked ? classnames.checkboxActive : "",
        ]}
        aria-hidden
      >
        <Checkmark />
      </span>
      {children}
    </Box>
  );
}

function Checkmark() {
  const D = BaseDom as any;
  return (
    <D
      aria-hidden
      role="img"
      element="svg"
      class={classnames.checkboxIcon}
      fill="none"
      stroke="var(--kit-background)"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="4"
        d="M5 13l4 4L19 7"
      />
    </D>
  );
}

Checkbox.Label = Text;

export function useCheckbox(initial?: boolean) {
  const { active, setActive, toggle } = useToggleState(initial);
  return {
    checked: active,
    setChecked: setActive,
    toggle,
  };
}

export * from "./types";
