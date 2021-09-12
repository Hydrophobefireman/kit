import { BaseElement, _util, useIsPending } from "@hydrophobefireman/kit";
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

import { RadioInputProps } from "./types";

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
  depends,
  name,
  ...rest
}: BaseElement<{
  value: T;
  setValue(a: T): void;
  label: string;
  as?: "div" | "span" | "Fragment";
  depends?: boolean;
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
      value={{ value, setValue, name: radioGroupName, depends } as any}
    >
      {children}
    </RadioContext.Provider>
  );
}

export function useRadio<T>(): {
  value: T;
  setValue(v: T): void;
  name: string;
  depends: boolean;
} {
  return useContext(RadioContext);
}
type BaseRadioProps<T> = BaseElement<
  RadioInputProps<T> & { ctx: ReturnType<typeof useRadio> }
>;
function BaseRadioInput<T>({
  value,
  children,
  errored,
  labelClass,
  inline,
  id,
  ctx,
  disabled,
  ...rest
}: BaseRadioProps<T>) {
  const { value: currentValue, setValue, name } = ctx;
  const [inputId, labelId] = useLabelId(id);
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
        classnames.relInputLabel,
        labelClass,
        errored && classnames.radioIsInvalid,
      ]}
      data-radio-value={value}
      inlineFlex={inline}
      dom={label}
      tabIndex={0}
      for={inputId}
      id={labelId}
      disabled={disabled}
    >
      {h(
        BaseDom,
        _util.extend(
          {
            element: "input",
            type: "radio",
            onInput: update,
            id: inputId,
            checked: isSelected,
            class: classnames._radioInputHidden,
            name: name,
            tabIndex: -1,
            "aria-labelledby": labelId,
            "aria-invalid": errored,
            "aria-checked": isSelected,
            disabled,
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
function DependantRadioInput<T>(props: BaseRadioProps<T>) {
  const { isPending } = useIsPending();
  if (!isPending) return h(BaseRadioInput, props as any);
  return h(
    BaseRadioInput,
    _util.extend(_util.removeEventsFromProps(props) as any, {
      labelClass: [props.labelClass, classnames.noEvents],
      disabled: true,
    })
  );
}
export function RadioInput<T>(props: BaseElement<RadioInputProps<T>>) {
  const { value: currentValue, setValue, name, depends } = useRadio<T>();

  const childProps: any = _util.extend(
    { ctx: { value: currentValue, setValue, name } },
    props
  );
  if (depends) {
    return h(DependantRadioInput, childProps);
  }
  return h(BaseRadioInput, childProps);
}
