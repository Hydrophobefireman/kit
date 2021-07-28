import { BaseElement, _util, useIsPending } from "@hydrophobefireman/kit";
import { BaseDom } from "@hydrophobefireman/kit/base-dom";
import * as classnames from "@hydrophobefireman/kit/classnames";
import { useId, useKeyPress } from "@hydrophobefireman/kit/hooks";
import { h, useMemo, useRef } from "@hydrophobefireman/ui-lib";

import { InputProps } from "./types";

const sizeToClassNameMap = new Map<InputProps["size"], string>([
  ["default", classnames.inputDefault],
  ["small", classnames.inputSmall],
  ["large", classnames.inputLarge],
]);

function BaseInput({
  variant,
  size,
  placeholder,
  label,
  id,
  wrapperClass,
  labelClass,
  class: cls,
  className,
  value,
  errored,
  dom,
  setValue,
  helperText,
  ...props
}: BaseElement<InputProps>) {
  const idx = useId(id);
  const labelIdx = `${idx}--label`;
  const s = size || "default";
  const isMat = variant === "material";
  const active = !!value;
  return (
    <BaseDom
      element="div"
      flex
      class={[
        classnames.inputContainer,
        sizeToClassNameMap.get(s),
        wrapperClass,
        isMat && classnames.relative,
      ]}
    >
      {h(
        BaseDom,
        _util.extend(
          {
            element: "input",
            id: idx,
            onInput: (e) => setValue && setValue(e.currentTarget.value),
            value: value,
            placeholder: isMat ? null : placeholder || label,
            "data-kit-active": active,
            "aria-labelledby": labelIdx,
            inlineFlex: true,
            dom: dom,
            class: [
              classnames.input,
              cls,
              className,
              isMat && classnames.inputMaterial,
              errored && classnames.errored,
            ],
          },
          props
        ) as any
      )}
      {helperText && (
        <div
          aria-hidden={!errored}
          class={[
            classnames.inputHelperText,
            errored
              ? classnames.inputHelperActive
              : classnames.inputHelperInactive,
          ]}
        >
          {helperText}
        </div>
      )}
      <label
        for={idx}
        id={labelIdx}
        class={[
          labelClass as any,
          isMat ? classnames.absolute : classnames.srOnly,
        ]}
      >
        {label || placeholder}
      </label>
    </BaseDom>
  );
}

function DependantInput(props: BaseElement<InputProps>) {
  const { isPending } = useIsPending();
  return h(
    BaseInput,
    isPending
      ? _util.extend(
          { disabled: true } as any,
          _util.removeEventsFromProps(props)
        )
      : (props as any)
  );
}
export function Input({ depends, ...rest }: BaseElement<InputProps>) {
  if (depends) {
    return h(DependantInput, rest as any);
  }
  return h(BaseInput, rest as any);
}
export function SearchInput(props: BaseElement<InputProps>) {
  const dom = useRef<HTMLInputElement>();
  _util.applyRef(props.dom, dom.current);

  useKeyPress("Escape", () => props.setValue && props.setValue(""), {
    target: dom.current,
  });
  useKeyPress(
    "/",
    _util.buildRaf(() => dom.current && dom.current.focus()),
    { target: typeof window !== "undefined" ? window : undefined }
  );
  return h(Input, _util.extend(props as any, { dom }));
}

Input.Search = SearchInput;
