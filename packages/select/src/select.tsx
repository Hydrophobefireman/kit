import {BaseElement, _util} from "@hydrophobefireman/kit";
import {OptionsRenderer} from "@hydrophobefireman/kit/_autocomplete-options";
import {BaseDom} from "@hydrophobefireman/kit/base-dom";
import * as classnames from "@hydrophobefireman/kit/classnames";
import {Box} from "@hydrophobefireman/kit/container";
import {Dropdown} from "@hydrophobefireman/kit/dropdown";
import {Keys, usePairedId, useToggleState} from "@hydrophobefireman/kit/hooks";
import {ChevronDownIcon} from "@hydrophobefireman/kit/icons";
import {Transition} from "@hydrophobefireman/kit/transition";
import {
  h,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "@hydrophobefireman/ui-lib";

import {SelectProps} from "./types";

const memoWarning = _util.warnOnce();
let memoCacheMissCount = 0;
export function Select({
  options: _options,
  id,
  dropdownClass,
  value,
  label,
  setValue: _setValue,
  buttonClass,
}: BaseElement<SelectProps>) {
  const options = useMemo(() => {
    if (memoCacheMissCount++ == 3) {
      memoWarning(null, "Remember to memo your options!");
    }
    return _options.map((x, i) => _util.extend({}, x, {pos: i + 1}));
  }, [_options]);
  const parentRef = useRef<HTMLElement>();
  const buttonRef = useRef<HTMLElement>();
  const [idx, labelId] = usePairedId(id);
  const [buttonId, controlledBoxId] = usePairedId();
  const {active, toggle, setActive} = useToggleState();
  const inputRef = useRef<HTMLInputElement>();
  const listboxRef = useRef<HTMLDivElement>();
  /*NodeJS.Timeout */
  const timerRef = useRef<any>();
  const ulRef = useRef<HTMLUListElement>();
  const [_inputValue, _setInputValue] = useState("");
  const [highlightedValue, __setHighlightedValue] = useState("");
  function setValue(nv: any) {
    __setHighlightedValue("");
    _setValue(nv);
  }
  function setHighlightedValue(e: any) {
    __setHighlightedValue(e);
    if (e) {
      if (ulRef.current) {
        const c = Array.from(ulRef.current.children);
        const el: any = c.find((x: HTMLElement) => x.dataset.value == e);
        if (el) {
          el.scrollIntoViewIfNeeded();
        }
      } else {
        // the select button hasn't been clicked, this is a keyboard navigation
        // and the user has tried to fill the select by typing
        // we skip all the intermediate steps and fire the onchange
        setValue(e);
      }
    }
  }
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
  function handleSetHighlightedValue(e: string): void;
  function handleSetHighlightedValue(e: JSX.TargetedEvent<HTMLElement>): void;
  function handleSetHighlightedValue(
    e: JSX.TargetedEvent<HTMLElement> | string
  ) {
    if (!e) return setHighlightedValue("");
    setHighlightedValue(
      typeof e === "string" ? e : (e.currentTarget.dataset.value as any)
    );
  }
  useEffect(() => {
    if (!_inputValue) return;
    const f = options.find(
      (x) =>
        String(x.value).toLowerCase().indexOf(_inputValue.toLowerCase()) === 0
    );
    if (f) setHighlightedValue(f.value);
  }, [_inputValue]);
  return (
    <Box ref={parentRef} inlineFlex>
      <label class={classnames.srOnly} id={labelId}>
        {label}
      </label>

      <input
        onBlur={(e) => {
          if (!active) return;
          const {relatedTarget} = e;
          if (
            !listboxRef.current.contains(relatedTarget as Node) &&
            relatedTarget !== buttonRef.current
          ) {
            setActive(false);
          }
        }}
        onKeyDown={({key}) => {
          let k: Keys = key as any;
          if (
            !active &&
            (k === "Enter" || k === "ArrowDown" || k === "ArrowUp")
          ) {
            setActive(true);
          }
        }}
        data-has-focus={String(active)}
        data-debug-value={_inputValue}
        value={_inputValue}
        onInput={handleHiddenInput}
        ref={inputRef}
        kit-hidden-input-trap
        class={classnames.srOnly}
        style={{fontSize: "16px"}}
      />
      <BaseDom
        element="button"
        button-reset
        id={buttonId}
        onFocus={(e) => {
          if (e.relatedTarget === inputRef.current) return;
          inputRef.current.focus();
        }}
        aria-haspopup="listbox"
        aria-expanded={active}
        ref={buttonRef as any}
        aria-controls={controlledBoxId}
        onClick={toggle}
        aria-label={label}
        class={[classnames._selectButton, buttonClass]}
      >
        <span>{value || label}</span>
        <ChevronDownIcon focusable="false" role="img" aria-hidden size={16} />
      </BaseDom>
      <Dropdown class={dropdownClass} parent={parentRef} sibling={buttonRef}>
        <Transition
          enterClass={classnames.autocompleteInactive}
          leaveClass={classnames.autocompleteInactive}
          class={classnames.autocompleteDropdown}
          id={active ? idx : ""}
          visible={active}
          render={
            active && options && options.length > 1 ? (
              <div
                class={classnames.autocompleteOptions}
                id={controlledBoxId}
                role="listbox"
                aria-controlledBy={buttonId}
                data-owner={buttonId}
                data-transition-owner={idx}
                ref={listboxRef}
              >
                <OptionsRenderer.__ControlledHighlightedElement
                  labelledBy={labelId}
                  size={options.length}
                  options={options}
                  __ulRef={ulRef}
                  currentValue={value as string}
                  select={handleSetValue}
                  setCurrentValue={handleSetValue}
                  highlightedValue={highlightedValue}
                  _setHighlightedValue={handleSetHighlightedValue}
                />
              </div>
            ) : null
          }
        />
      </Dropdown>
    </Box>
  );
}

Select.EventDriven = function ({
  onChange,
  ...props
}: Omit<BaseElement<SelectProps>, "value" | "setValue"> & {
  onChange(next: string, prev: string): void;
}) {
  const [value, _setValue] = useState("");
  return h(
    Select,
    _util.extend(props, {
      value,
      setValue(next: string) {
        _setValue(next);
        onChange(next, value);
      },
    })
  );
};
