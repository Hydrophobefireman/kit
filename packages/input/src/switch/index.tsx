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
  ...rest
}: BaseElement<SwitchProps>) {
  const [currentState, setState] = useState<SwitchProps["state"]>(state);
  function toggle() {
    setState(
      currentState === "disabled" || currentState === "intermediate"
        ? "enabled"
        : "disabled"
    );
  }
  const [inputId, labelId] = useLabelId(id);
  return (
    <Container
      row
      vertical="center"
      element="label"
      class={[
        classnames.relInputLabel,
        labelClass,
        errored && classnames.switchIsInvalid,
      ]}
      data-value={`${state}`}
      inlineFlex={inline}
      for={inputId}
      id={labelId}
      tabIndex={0}
    >
      {h(
        BaseDom,
        _util.extend({
          element: "input",
          type: "checkbox",
          id: inputId,
          checked: state === "enabled",
          
        })
      )}
    </Container>
  );
}
