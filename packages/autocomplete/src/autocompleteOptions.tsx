import * as classnames from "@hydrophobefireman/kit/classnames";
import { useKeyPress } from "@hydrophobefireman/kit/hooks";
import {
  RefType,
  forwardRef,
  h,
  useEffect,
  useRef,
  useState,
} from "@hydrophobefireman/ui-lib";

import {
  AutoCompleteOptionsProps,
  AutoCompleteOptionsRendererProps,
  AutoCompleteValue,
  OptionsRendererProps,
} from "./types";
import { clean, contains } from "./util";

function OptionsValue({
  render,
  value,
  select,
  currentValue,
}: AutoCompleteOptionsProps & {
  select(e: any): void;
  currentValue: AutoCompleteValue;
}) {
  const ref = useRef<HTMLLIElement>();
  useKeyPress("Enter", select, { target: ref.current });
  return (
    <li
      role="option"
      tabIndex={-1}
      ref={ref}
      onClick={select}
      data-value={value}
      data-active={String(currentValue === value)}
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
  labelledBy,
}: OptionsRendererProps) {
  return (
    <ul class={classnames._autoCompleteInlineList} aria-labelledBy={labelledBy}>
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

export const AutoCompleteOptions = forwardRef<
  AutoCompleteOptionsRendererProps,
  any
>(function _AutoCompleteOptions(
  {
    options,
    query,
    select,
    containsFunction,
    noSuggestions,
    labelledBy,
  }: AutoCompleteOptionsRendererProps,
  ref: RefType<any>
) {
  query = query || "";
  const funcRef = useRef<(a: AutoCompleteValue, b: string) => boolean>();
  funcRef.current = containsFunction || contains;
  const [filteredOptions, setFilteredOptions] = useState<
    AutoCompleteOptionsProps[]
  >([]);
  useEffect(() => {
    const { current } = funcRef;
    if (!options || !options.length) return setFilteredOptions([]);
    if (current === contains && !clean(query))
      return setFilteredOptions(options);

    setFilteredOptions(options.filter((x) => !!current(x.value, query as any)));
  }, [query, options, containsFunction]);

  return filteredOptions.length ? (
    <div class={classnames.autocompleteOptions} ref={ref}>
      <OptionsRenderer
        labelledBy={labelledBy}
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
});
