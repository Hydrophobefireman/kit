import {BaseElement, _util} from "@hydrophobefireman/kit";
import {Input} from "@hydrophobefireman/kit/input";
import {forwardRef, h, useEffect, useState} from "@hydrophobefireman/ui-lib";

import {AutoCompleteInputProps} from "./types";

export const AutoCompleteInput = forwardRef<
  BaseElement<AutoCompleteInputProps>
>(function (
  {
    mode,
    value,
    setDirty,
    optionRef,
    expanded,
    setQuery,
    setValueRef,
    ...props
  }: BaseElement<AutoCompleteInputProps>,
  ref
) {
  const [_value, setValue] = useState(value);
  setValueRef.current = setValue;
  // we sync the value to the parent component only when
  // we have committed our changes to our input element
  // since this is a controlled input
  // doing this is important because
  // otherwise it would schedule another update
  // and the diffing function would run before this latest
  // change has been committed to the dom
  // now this WILL be batched which means
  // the diff will run twice, once with the new value
  // and once with the older one
  // it causes multiple renders
  // and ui lib has to re-patch the dom
  // to get the latest value
  // this is unnoticable on desktops
  // but causes usability issues
  // isolating this input simply helps by
  // "debouncing" the parent rerender

  useEffect(() => setQuery(_value), [_value]);
  return h(
    mode === "search" ? Input.Search : Input,
    _util.extend({}, props, {
      autoComplete: "off",
      value: _value,
      onFocus: (e: JSX.TargetedFocusEvent<HTMLElement>) => {
        setDirty(true);
        props.onFocus?.call(e.currentTarget, e);
      },
      onBlur: (e: JSX.TargetedFocusEvent<HTMLInputElement>) => {
        const newFocus = e.relatedTarget as HTMLElement;
        setDirty(
          optionRef.current
            ? newFocus === optionRef.current ||
                optionRef.current.contains(newFocus)
            : false
        );
        props.onBlur?.call(e.currentTarget, e);
      },
      setValue: (v: string) => {
        setDirty(true);
        setValue(v);
      },
      ref: ref,
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-expanded": expanded,
    } as any)
  );
});
