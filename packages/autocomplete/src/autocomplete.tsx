import { BaseElement, _util, useIsPending } from "@hydrophobefireman/kit";
import * as classnames from "@hydrophobefireman/kit/classnames";
import { Container } from "@hydrophobefireman/kit/container";
import { Dropdown } from "@hydrophobefireman/kit/dropdown";
import { useClickAway, useId } from "@hydrophobefireman/kit/hooks";
import { Input } from "@hydrophobefireman/kit/input";
import { Transition } from "@hydrophobefireman/kit/transition";
import { h, useEffect, useRef, useState } from "@hydrophobefireman/ui-lib";

import { AutoCompleteOptions } from "./autocompleteOptions";
import { AutoCompleteProps } from "./types";

function BaseAutoComplete({
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
  id,
  ...props
}: BaseElement<AutoCompleteProps>) {
  const [query, setQuery] = useState(String(value || ""));
  useEffect(() => setQuery(String(value || "")), [value]);
  const ref = useRef<HTMLInputElement>();
  const [dirty, setDirty] = useState(false);
  const parentRef = useRef<HTMLElement>();
  const expanded = !isPending && dirty;
  const idx = useId(id);
  const inputJsx = h(
    mode === "search" ? Input.Search : Input,
    _util.extend(props, {
      autoComplete: "off",
      value: value,
      onFocus: () => {
        setDirty(true);
      },
      setValue: (v: string) => {
        setDirty(true);
        setValue(v);
      },
      ref: ref,
      depends,
      "aria-autocomplete": "list",
      "aria-expanded": expanded,
    } as any)
  );
  function select(e: JSX.TargetedMouseEvent<any>) {
    const { currentTarget } = e;
    setValue(currentTarget.dataset.value);
    setDirty(false);
  }
  const dropdownActive = expanded && options.length > 0;
  useClickAway(
    () => setDirty(false),
    dropdownActive ? parentRef.current : (null as any)
  );
  return (
    <Container class={containerClass} ref={parentRef}>
      {inputJsx}
      <Dropdown
        style={dropdownActive ? null : { overflow: "hidden" }}
        parent={parentRef.current}
        class={dropdownClass}
      >
        <Transition
          enterClass={classnames.autocompleteInactive}
          leaveClass={classnames.autocompleteInactive}
          class={classnames.autocompleteDropdown}
          id={dropdownActive ? idx : ""}
          render={
            dropdownActive && (
              <AutoCompleteOptions
                noSuggestions={noSuggestions}
                options={options}
                query={query}
                select={select}
              />
            )
          }
        />
      </Dropdown>
    </Container>
  );
}

function DependantAutoComplete(props: BaseElement<AutoCompleteProps>) {
  const { isPending } = useIsPending();
  if (isPending)
    return h(
      BaseAutoComplete,
      _util.extend(_util.removeEventsFromProps(props), {
        disabled: true,
        isPending,
      }) as any
    );

  return h(BaseAutoComplete, props as any);
}

export function AutoComplete(props: BaseElement<AutoCompleteProps>) {
  if (props.depends) return h(DependantAutoComplete, props as any);
  return h(BaseAutoComplete, props as any);
}

export function useAutoComplete(initial: string) {
  const [value, setValue] = useState(initial || "");
  return { value, setValue };
}
