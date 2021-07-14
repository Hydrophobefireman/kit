import { BaseElement, _util, useIsPending } from "@hydrophobefireman/kit";
import { BaseDom } from "@hydrophobefireman/kit/base-dom";
import * as classnames from "@hydrophobefireman/kit/classnames";
import { Keys, useKeyPress, useKeyboard } from "@hydrophobefireman/kit/hooks";
import { h, useMemo, useRef, useState } from "@hydrophobefireman/ui-lib";

import { InputProps } from "./types";

const sizeToClassNameMap = new Map<InputProps["size"], string>([
  ["default", classnames.inputDefault],
  ["small", classnames.inputSmall],
  ["large", classnames.inputLarge],
]);

let _id = 0;
const kitAutoIdPrefix = `__kit-auto-id-${Math.random()
  .toString(32)
  .substring(2)}`;

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
  const currentIdx = useMemo(() => String(id || ++_id), [id]);
  const idx = id ? currentIdx : `${kitAutoIdPrefix}-${currentIdx}`;
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
      <BaseDom
        id={idx}
        onInput={(e: JSX.TargetedKeyboardEvent<HTMLInputElement>) =>
          setValue && setValue(e.currentTarget.value)
        }
        value={value}
        placeholder={isMat ? null : placeholder || label}
        data-kit-active={active}
        element="input"
        inlineFlex
        dom={dom}
        class={[
          classnames.input,
          cls,
          className,
          isMat && classnames.inputMaterial,
          errored && classnames.errored,
        ]}
        {...props}
      />
      <div
        class={[
          classnames.inputHelperText,
          errored
            ? classnames.inputHelperActive
            : classnames.inputHelperInactive,
        ]}
      >
        {helperText}
      </div>
      <label
        for={idx}
        class={[labelClass, isMat ? classnames.absolute : classnames.srOnly]}
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
      ? Object.assign(
          { disabled: true, "kit-disabled": true } as any,
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

  useKeyPress("Escape", () => props.setValue(""), { target: dom.current });
  useKeyPress(
    "/",
    _util.buildRaf(() => dom.current && dom.current.focus())
  );
  return h(Input, Object.assign(props as any, { dom }));
}

Input.Search = SearchInput;
