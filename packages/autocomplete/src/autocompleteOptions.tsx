import {
  useEffect,
  useRef,
  useState,
  Fragment,
  h,
} from "@hydrophobefireman/ui-lib";

import {
  AutoCompleteOptions,
  AutoCompleteOptionsRendererProps,
  AutoCompleteValue,
} from "./types";
import { clean, contains } from "./util";

function renderOptions(options: AutoCompleteOptions[]) {
  return options.map(({ render, value }) => (
    <div>{render ? render(value) : value}</div>
  ));
}

export function AutoCompleteOptions({
  options,
  query,
  containsFunction,
}: AutoCompleteOptionsRendererProps) {
  const funcRef = useRef<(a: AutoCompleteValue, b: string) => boolean>();
  funcRef.current = containsFunction || contains;
  const [filteredOptions, setFilteredOptions] = useState([]);
  useEffect(() => {
    const { current } = funcRef;
    if (!options || !options.length) return setFilteredOptions([]);
    if (current === contains && !clean(query))
      return setFilteredOptions(options);

    setFilteredOptions(options.filter((x) => !!current(x.value, query)));
  }, [query, options, containsFunction]);

  return h(Fragment, null, renderOptions(filteredOptions));
}
