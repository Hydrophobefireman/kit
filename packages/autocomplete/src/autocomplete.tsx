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
  value,
  options,
  containerClass,
  isPending,
  __depends,
  id,
  ...props
}: BaseElement<AutoCompleteProps>) {
  const [query, setQuery] = useState(String(value) || "");
  useEffect(() => {
    setQuery(value as any);
  }, [value]);
  const ref = useRef<HTMLInputElement>();
  const [dirty, setDirty] = useState(false);
  _util.applyRef(props.dom, ref.current);
  const parentRef = useRef<HTMLElement>();
  const expanded = !isPending && dirty;
  const idx = useId(id);
  const inputJsx = h(
    mode === "search" ? Input.Search : Input,
    _util.extend(props, {
      autoComplete: "off",
      value: query,
      onFocus: () => {
        setDirty(true);
      },
      setValue: (v: string) => {
        setDirty(true);
        setQuery(v);
      },
      dom: ref,
      depends: __depends,
      "aria-autocomplete": "list",
      "aria-expanded": expanded,
    } as any)
  );
  function select(e: JSX.TargetedMouseEvent<any>) {
    const { currentTarget } = e;
    setQuery(currentTarget.dataset.value);
    setDirty(false);
  }
  const dropdownActive = expanded && options.length > 0;
  useClickAway(
    () => setDirty(false),
    dropdownActive ? parentRef.current : (null as any)
  );
  return (
    <Container class={containerClass} dom={parentRef}>
      {inputJsx}
      <Dropdown parent={parentRef.current}>
        <Transition
          enterClass={classnames.autocompleteInactive}
          leaveClass={classnames.autocompleteInactive}
          class={classnames.autocompleteDropdown}
          id={dropdownActive ? idx : ""}
          render={
            dropdownActive && (
              <div class={classnames.autocompleteOptions}>
                <AutoCompleteOptions
                  options={options}
                  query={query}
                  select={select}
                />
              </div>
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
        __depends: true,
        disabled: true,
        isPending,
      }) as any
    );

  return h(BaseAutoComplete, _util.extend({ __depends: true }, props as any));
}

export function AutoComplete({
  depends,
  ...props
}: BaseElement<AutoCompleteProps>) {
  if (depends) return h(DependantAutoComplete, props as any);
  return h(BaseAutoComplete, props as any);
}
