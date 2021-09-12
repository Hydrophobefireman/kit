import { h, useEffect, useRef, useState } from "@hydrophobefireman/ui-lib";
import * as classnames from "@hydrophobefireman/kit/classnames";
import {
  AutoCompleteOptions,
  AutoCompleteOptionsRendererProps,
  AutoCompleteValue,
  OptionsRendererProps,
} from "./types";
import { clean, contains } from "./util";
import { useKeyPress } from "@hydrophobefireman/kit/hooks";

function OptionsValue({
  render,
  value,
  select,
  currentValue,
}: AutoCompleteOptions & {
  select(e: any): void;
  currentValue: AutoCompleteValue;
}) {
  const dom = useRef<HTMLLIElement>();
  useKeyPress("Enter", select, { target: dom.current });
  return (
    <li
      ref={dom}
      onClick={select}
      data-value={value}
      data-active={String(currentValue === value)}
      tabIndex={0}
      class={[
        classnames.autocompleteOption,
        currentValue === value ? classnames.autocompleteCurrentValue : "",
      ]}
    >
      {render ? render(value) : value}
    </li>
  );
}
function OptionsRenderer({
  options,
  currentValue,
  select,
}: OptionsRendererProps) {
  return (
    <ul class={classnames._autoCompleteInlineList}>
      {options.map(({ render, value }) => (
        <OptionsValue
          render={render}
          value={value}
          select={select}
          currentValue={currentValue}
        />
      ))}
    </ul>
  );
}

export function AutoCompleteOptions({
  options,
  query,
  select,
  containsFunction,
  noSuggestions,
}: AutoCompleteOptionsRendererProps) {
  query = query || "";
  const funcRef = useRef<(a: AutoCompleteValue, b: string) => boolean>();
  funcRef.current = containsFunction || contains;
  const [filteredOptions, setFilteredOptions] = useState<AutoCompleteOptions[]>(
    []
  );
  useEffect(() => {
    const { current } = funcRef;
    if (!options || !options.length) return setFilteredOptions([]);
    if (current === contains && !clean(query))
      return setFilteredOptions(options);

    setFilteredOptions(options.filter((x) => !!current(x.value, query)));
  }, [query, options, containsFunction]);

  return filteredOptions.length ? (
    <div class={classnames.autocompleteOptions}>
      <OptionsRenderer
        options={filteredOptions}
        currentValue={query}
        select={select}
      />
    </div>
  ) : noSuggestions ? (
    typeof noSuggestions === "function" ? (
      h(noSuggestions)
    ) : (
      noSuggestions
    )
  ) : (
    <kit-no-suggestions />
  );
}
