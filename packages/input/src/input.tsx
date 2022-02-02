import {BaseElement, _util} from "@hydrophobefireman/kit";
import {BaseDom} from "@hydrophobefireman/kit/base-dom";
import * as classnames from "@hydrophobefireman/kit/classnames";
import {
  _useSelfEvent,
  useKeyPress,
  usePairedId,
} from "@hydrophobefireman/kit/hooks";
import {forwardRef, h, useRef} from "@hydrophobefireman/ui-lib";

import {InputProps} from "./types";

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
}: BaseElement<InputProps> & {__$ref: any}) {
  const [idx, labelIdx] = usePairedId(id);
  const divId = `${idx}--validity-checker`;
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
            "aria-invalid": !!errored,
            "aria-describedby": divId,
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
      <div
        id={divId}
        aria-hidden={!errored || !helperText}
        class={[
          classnames.inputHelperText,
          errored && helperText
            ? classnames.inputHelperActive
            : classnames.inputHelperInactive,
        ]}
      >
        {helperText}
      </div>
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

function InputComponent(props: BaseElement<InputProps>, ref) {
  const rest = _util.extend(props, {__$ref: ref});
  return h(BaseInput, rest as any);
}

export const SearchInput = forwardRef<BaseElement<InputProps>>(
  function SearchInput(props: BaseElement<InputProps>, ref) {
    const $internalDom = useRef<HTMLInputElement>();

    useKeyPress("Escape", () => props.setValue && props.setValue(""), {
      target: $internalDom.current,
    });

    useKeyPress(
      "/",
      _useSelfEvent(
        _util.buildRaf(
          () => $internalDom.current && $internalDom.current.focus()
        )
      ),
      {target: typeof document !== "undefined" ? document.body : undefined}
    );
    const commonRef = _util.useSyncedRefs(ref, $internalDom);
    return h(
      Input,
      _util.extend(props as any, {
        ref: commonRef,
      })
    );
  }
);
export const Input: typeof InputComponent & {Search: typeof SearchInput} =
  forwardRef<BaseElement<InputProps>>(InputComponent) as any;
(Input as any).Search = SearchInput;
