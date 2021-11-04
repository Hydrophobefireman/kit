import {BaseElement, _util} from "@hydrophobefireman/kit";
import {OptionsRenderer} from "@hydrophobefireman/kit/_autocomplete-options";
import {BaseDom} from "@hydrophobefireman/kit/base-dom";
import * as classnames from "@hydrophobefireman/kit/classnames";
import {Box} from "@hydrophobefireman/kit/container";
import {Dropdown} from "@hydrophobefireman/kit/dropdown";
import {usePairedId, useToggleState} from "@hydrophobefireman/kit/hooks";
import {ChevronDownIcon} from "@hydrophobefireman/kit/icons";
import {Transition} from "@hydrophobefireman/kit/transition";
import {useEffect, useRef, useState} from "@hydrophobefireman/ui-lib";

import {SelectProps} from "./types";

export function Select({
  options,
  id,
  dropdownClass,
  value,
  label,
  setValue,
  buttonClass,
}: BaseElement<SelectProps>) {
  const parentRef = useRef<HTMLElement>();
  const buttonRef = useRef<HTMLElement>();
  const [idx, labelId] = usePairedId(id);
  const [buttonId, controlledBoxId] = usePairedId();
  const {active, toggle, setActive} = useToggleState();
  const inputRef = useRef<HTMLInputElement>();
  const listboxRef = useRef<HTMLDivElement>();
  /*NodeJS.Timeout */
  const timerRef = useRef<any>();
  const [_inputValue, _setInputValue] = useState("");

  useEffect(() => {
    active && inputRef.current.focus();
  }, [active]);
  function clearTimer() {
    clearTimeout(timerRef.current);
  }
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      clearTimer();
      _setInputValue("");
    }, 500);
    return;
  }, [_inputValue]);
  function handleHiddenInput(e: JSX.TargetedKeyboardEvent<HTMLInputElement>) {
    clearTimer();
    _setInputValue(e.currentTarget.value);
  }

  function handleSetValue(e: string): void;
  function handleSetValue(e: JSX.TargetedEvent<HTMLElement>): void;
  function handleSetValue(e: JSX.TargetedEvent<HTMLElement> | string) {
    setValue(
      typeof e === "string" ? e : (e.currentTarget.dataset.value as any)
    );
    setActive(false);
  }
  useEffect(() => {
    if (!_inputValue) return;
    const f = options.find(
      (x) =>
        String(x.value).toLowerCase().indexOf(_inputValue.toLowerCase()) === 0
    );
    if (f) setValue(f.value);
  }, [_inputValue]);
  return (
    <Box ref={parentRef} inlineFlex>
      <label class={classnames.srOnly} id={labelId}>
        {label}
      </label>
      <BaseDom
        id={buttonId}
        aria-haspopup="listbox"
        aria-expanded={active}
        element="button"
        ref={buttonRef as any}
        onClick={toggle}
        aria-label={label}
        class={[classnames._selectButton, buttonClass]}
      >
        <span>{value || label}</span>
        <ChevronDownIcon focusable="false" role="img" aria-hidden size={16} />
      </BaseDom>
      <input
        onBlur={(e) => {
          const {relatedTarget} = e;
          if (
            relatedTarget !== buttonRef.current &&
            !listboxRef.current.contains(relatedTarget as Node)
          )
            setActive(false);
        }}
        data-has-focus={String(active)}
        data-debug-value={_inputValue}
        value={_inputValue}
        onInput={handleHiddenInput}
        ref={inputRef}
        class={classnames.srOnly}
        style={{fontSize: "16px"}}
      />
      <Dropdown class={dropdownClass} parent={parentRef} sibling={buttonRef}>
        <Transition
          enterClass={classnames.autocompleteInactive}
          leaveClass={classnames.autocompleteInactive}
          class={classnames.autocompleteDropdown}
          id={active ? idx : ""}
          visible={active}
          render={
            active && (
              <div
                class={classnames.autocompleteOptions}
                id={controlledBoxId}
                role="listbox"
                aria-controlledBy={buttonId}
                data-owner={buttonId}
                data-transition-owner={idx}
                ref={listboxRef}
              >
                <OptionsRenderer
                  labelledBy={labelId}
                  options={options}
                  currentValue={value as string}
                  select={handleSetValue}
                  setCurrentValue={handleSetValue}
                />
              </div>
            )
          }
        />
      </Dropdown>
    </Box>
  );
}
