import { BaseElement, _util } from "@hydrophobefireman/kit";
import * as classnames from "@hydrophobefireman/kit/classnames";
import { Box } from "@hydrophobefireman/kit/container";
import { Dropdown } from "@hydrophobefireman/kit/dropdown";
import { useId } from "@hydrophobefireman/kit/hooks";
import { Transition } from "@hydrophobefireman/kit/transition";
import { h, useMemo, useRef, useState } from "@hydrophobefireman/ui-lib";

import { AutoCompleteInput } from "./autocomplete-input";
import { AutoCompleteOptions } from "./autocompleteOptions";
import { AutoCompleteProps } from "./types";

export function BaseAutoComplete({
  mode,
  itemRender,
  onChange,
  setValue,
  value,
  options,
  containerClass,
  isPending,
  depends,
  dropdownClass,
  noSuggestions,
  preserveOpenOnClick,
  id,
  ...props
}: BaseElement<AutoCompleteProps>) {
  const inputRef = useRef<HTMLInputElement>();
  const [dirty, setDirty] = useState(false);
  const parentRef = useRef<HTMLElement>();
  const expanded = !isPending && dirty;
  const idx = useId(id);
  const optionRef = useRef<HTMLElement>();
  const __setInputValue = useRef<(v: any) => void>();

  function $setValue(t: string) {
    __setInputValue.current && __setInputValue.current(t);
    if (!preserveOpenOnClick) {
      setDirty(false);
      const { activeElement } = document;
      activeElement && (activeElement as any).blur();
    }
  }

  function select(e: JSX.TargetedMouseEvent<any>) {
    const { currentTarget } = e;
    // the only component that syncs and ties everything else
    // should be the autocompleteInput
    // that is our ONLY source of truth
    // everything else will get the latest value from it
    // so in case someone selects the input,
    // that's where the value should be updated to
    // and from there we have a use effect that will sync it
    // upwards.
    // we do this because we dont want
    // the different layers of components going out of sync
    // and having a sad useEffect call to tie the states together
    // its slow, clunky, janky and also causes BAD ux on mobile keyboards
    // (basically unusable if you type fast enough)
    // this looks unnatural but this is the only way i can think of
    // that syncs every state together and does what should give the best UX
    // the input element updates immediately and the
    // option elements get the latest value in the next frame
    // this is also good for perf since the input is never blocked
    // even if we have a thousand options, the input should
    // be snappier than a single state being shared across everwhere.
    $setValue(currentTarget.dataset.value);
  }

  const dropdownActive = expanded && options.length > 0;
  const inputId = useMemo(() => `${idx + _util.random()}--input`, [idx]);
  const labelId = useMemo(() => `${inputId}--label`, [inputId]);

  return (
    <Box class={containerClass} ref={parentRef}>
      {h(
        AutoCompleteInput,
        _util.extend(
          {
            ref: inputRef,
            value,
            setValueRef: __setInputValue,
            setQuery: (q: string) => {
              setValue(q);
            },
            mode,
            setDirty,
            optionRef,
            depends,
            expanded,
            id: inputId,
          },
          props
        ) as any
      )}
      <Dropdown
        style={dropdownActive ? null : { overflow: "hidden" }}
        parent={parentRef}
        sibling={inputRef}
        class={dropdownClass}
      >
        <Transition
          enterClass={classnames.autocompleteInactive}
          leaveClass={classnames.autocompleteInactive}
          class={classnames.autocompleteDropdown}
          id={dropdownActive ? idx : ""}
          visible={dropdownActive}
          render={
            dropdownActive && (
              <AutoCompleteOptions
                ref={optionRef}
                noSuggestions={noSuggestions}
                options={options}
                query={value}
                setQuery={$setValue}
                select={select}
                labelledBy={labelId}
              />
            )
          }
        />
      </Dropdown>
    </Box>
  );
}
