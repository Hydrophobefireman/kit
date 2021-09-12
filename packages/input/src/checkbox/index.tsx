import { BaseElement, _util } from "@hydrophobefireman/kit";
import { BaseDom } from "@hydrophobefireman/kit/base-dom";
import * as classnames from "@hydrophobefireman/kit/classnames";
import { Container } from "@hydrophobefireman/kit/container";
import { useLabelId } from "@hydrophobefireman/kit/hooks";
import { Text } from "@hydrophobefireman/kit/text";
import { h, useState } from "@hydrophobefireman/ui-lib";

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
  id,
  ...rest
}: BaseElement<CheckboxProps>) {
  const [inputId, labelId] = useLabelId(id);
  return (
    <Container
      inlineFlex={inline}
      row
      depends={depends}
      vertical="center"
      element="label"
      class={[
        classnames.relInputLabel,
        boxClass,
        { [classnames.checkboxIsInvalid]: errored },
      ]}
      style={boxStyle}
      for={inputId}
      id={labelId}
      tabIndex={0}
    >
      {h(
        BaseDom,
        _util.extend(
          {
            element: "input",
            onInput: (e) =>
              onCheck((e.currentTarget as HTMLInputElement).checked),
            checked: checked,
            class: [classnames._checkboxInputHidden, cls, className],
            type: "checkbox",
            "aria-checked": checked,
            "aria-labelledby": labelId,
            "aria-invalid": errored,
          },
          rest
        )
      )}
      <span class={classnames.checkboxIconContainer} aria-hidden>
        <Checkmark active={checked} />
      </span>
      {children}
    </Container>
  );
}

function Checkmark({ active }: { active: boolean }) {
  const D = BaseDom as any;
  return (
    <D
      aria-hidden
      role="img"
      element="svg"
      class={[
        classnames.checkboxIcon,
        { [classnames.checkboxIconActive]: active },
      ]}
      fill="none"
      stroke="var(--kit-foreground)"
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
  const [checked, setChecked] = useState(!!initial);
  return { checked, setChecked, toggle: () => setChecked(!checked) };
}

export * from "./types";
