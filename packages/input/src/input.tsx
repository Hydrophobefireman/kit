import { BaseElement, _util, useIsPending } from "@hydrophobefireman/kit";
import { BaseDom } from "@hydrophobefireman/kit/base-dom";
import * as classnames from "@hydrophobefireman/kit/classnames";
import { useKeyPress, useLabelId } from "@hydrophobefireman/kit/hooks";
import { forwardRef, h, useRef } from "@hydrophobefireman/ui-lib";

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
  setValue,
  helperText,
  __$ref,
  ...props
}: BaseElement<InputProps> & { __$ref: any }) {
  const [idx, labelIdx] = useLabelId(id);
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
            ref: __$ref,
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
function DependantInput(props: BaseElement<InputProps> & { __$ref: any }) {
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
function InputComponent({ depends, ..._rest }: BaseElement<InputProps>, ref) {
  const rest = _util.extend(_rest, { __$ref: ref });
  if (depends) {
    return h(DependantInput, rest as any);
  }
  return h(BaseInput, rest as any);
}

export const SearchInput = forwardRef(function SearchInput(
  props: BaseElement<InputProps>,
  ref
) {
  const $internalDom = useRef<HTMLInputElement>();

  useKeyPress("Escape", () => props.setValue && props.setValue(""), {
    target: $internalDom.current,
  });
  useKeyPress(
    "/",
    _util.buildRaf(() => $internalDom.current && $internalDom.current.focus()),
    { target: typeof window !== "undefined" ? window : undefined }
  );
  return h(
    Input,
    _util.extend(props as any, {
      ref: _util.applyForwardedRef(ref, $internalDom),
    })
  );
});
export const Input: typeof InputComponent & { Search: typeof SearchInput } =
  forwardRef(InputComponent) as any;
(Input as any).Search = SearchInput;
