import { BaseElement, _util } from "@hydrophobefireman/kit";
import { BaseDom } from "@hydrophobefireman/kit/base-dom";
import * as classnames from "@hydrophobefireman/kit/classnames";
import { Container } from "@hydrophobefireman/kit/container";
import { useId, useKeyPress, useLabelId } from "@hydrophobefireman/kit/hooks";
import {
  Fragment,
  createContext,
  h,
  useContext,
  useRef,
} from "@hydrophobefireman/ui-lib";

export * from "./types";
const RadioContext = createContext({
  value: null,
  setValue: _util.noop,
  name: "",
} as any);

export function RadioGroup<T>({
  children,
  value,
  setValue,
  as,
  label,
  name,
  ...rest
}: BaseElement<{
  value: T;
  setValue(a: T): void;
  label: string;
  as?: "div" | "span" | "Fragment";
}>) {
  const isFragment = as === "Fragment";
  const el = isFragment ? Fragment : as || "div";
  const radioGroupName = useId(name);
  return h(
    el,
    isFragment
      ? null
      : _util.extend(rest, {
          role: "radiogroup",
          "aria-label": label,
          "data-current-value": value,
        }),
    <RadioContext.Provider
      value={{ value, setValue, name: radioGroupName } as any}
    >
      {children}
    </RadioContext.Provider>
  );
}

export function useRadio<T>(): {
  value: T;
  setValue(v: T): void;
  name: string;
} {
  return useContext(RadioContext);
}

export function RadioInput<T>({
  value,
  children,
  errored,
  labelClass,
  inline,
  id,
  ...rest
}: BaseElement<{
  value: T;
  errored?: boolean;
  labelClass?: string;
  inline?: boolean;
}>) {
  const [inputId, labelId] = useLabelId(id);
  const { value: currentValue, setValue, name } = useRadio<T>();
  const isSelected = currentValue === value;
  const label = useRef<HTMLLabelElement>();
  const update = () => setValue(value);
  useKeyPress(
    " ",
    (e) => {
      update();
      e.preventDefault();
    },
    {
      target: label.current,
      passive: false,
    }
  );
  return (
    <Container
      row
      vertical="center"
      element="label"
      class={[
        classnames.relInput,
        labelClass,
        errored && classnames.radioIndicatorIsInvalid,
      ]}
      data-radio-value={value}
      inlineFlex={inline}
      dom={label}
      tabIndex={0}
      for={inputId}
      id={labelId}
    >
      {h(
        BaseDom,
        _util.extend(
          {
            element: "input",
            onInput: update,
            id: inputId,
            "aria-labelledby": labelId,
            checked: isSelected,
            class: classnames._radioInputHidden,
            type: "radio",
            name: name,
            "aria-invalid": errored,
            tabIndex: -1,
            "aria-checked": isSelected,
          },
          rest
        )
      )}
      <span class={classnames.radioSpan} aria-hidden>
        <BaseDom
          class={[
            classnames.radioIndicator,
            { [classnames.radioIndicatorActive]: isSelected },
          ]}
          element="span"
        />
      </span>
      {children}
    </Container>
  );
}
