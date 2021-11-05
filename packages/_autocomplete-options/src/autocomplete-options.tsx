import {_util} from "@hydrophobefireman/kit";
import * as classnames from "@hydrophobefireman/kit/classnames";
import {useKeyPress} from "@hydrophobefireman/kit/hooks";
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
import {clean, contains} from "./util";

const win = typeof window !== "undefined" ? window : (null as any);
const opts = {target: win};
const optsPreventDefault = _util.extend({passive: false}, opts);
_util.scrollIntoViewIfNeededPolyfill();
function OptionsValue({
  render,
  value,
  select,
  currentValue,
  highlightedValue,
}: AutoCompleteOptionsProps & {
  select(e: any): void;
  currentValue: AutoCompleteValue;
  highlightedValue: string | null;
}) {
  return (
    <li
      role="option"
      tabIndex={-1}
      onClick={select}
      data-value={value}
      data-active={String(currentValue === value || highlightedValue === value)}
      class={[
        classnames.autocompleteOption,
        currentValue === value ? classnames.autocompleteCurrentValue : "",
      ]}
    >
      {render ? render(value) : value}
    </li>
  );
}
function _OptionsRenderer({
  options,
  currentValue,
  select,
  setCurrentValue,
  labelledBy,
  __ulRef,
  _setHighlightedValue,
  highlightedValue,
  preventDefault,
}: OptionsRendererProps & {
  highlightedValue: any;
  _setHighlightedValue(a: any): void;
  __ulRef?: RefType<HTMLUListElement>;
}) {
  useEffect(() => {
    setHighlightedValue(null);
  }, [currentValue]);
  function setHighlightedValue(e: HTMLElement | null) {
    if (!e) return _setHighlightedValue(null);
    (e as any).scrollIntoViewIfNeeded();
    _setHighlightedValue(e.dataset.value!);
  }
  function _arrow() {
    const listParent = _InternalUlRef.current;

    const children: HTMLLIElement[] = Array.from(listParent.children) as any;
    let $curr: number = 0;
    const activeChild = children.find((x, i) => {
      // store the index in $curr
      // so that we don't have to do an indexOf
      $curr = i;
      return x.dataset.value === highlightedValue;
    });
    return {children, activeChild, $curr};
  }
  function handleArrowUp(e: JSX.TargetedKeyboardEvent<Window>) {
    preventDefault && e.preventDefault();
    const {activeChild, children, $curr} = _arrow();
    if (!activeChild) {
      const lastChild = children[children.length - 1];

      return setHighlightedValue(lastChild);
    }
    const firstChild = children[0];
    if (activeChild === firstChild) {
      return setHighlightedValue(null);
    }
    setHighlightedValue(children[$curr - 1]);
  }
  function handleArrowDown(e: JSX.TargetedKeyboardEvent<Window>) {
    preventDefault && e.preventDefault();
    const {$curr, activeChild, children} = _arrow();
    if (!activeChild) {
      const firstChild = children[0];
      return setHighlightedValue(firstChild);
    }
    const lastChild = children[children.length - 1];
    if (activeChild === lastChild) {
      return setHighlightedValue(null);
    }
    setHighlightedValue(children[$curr + 1]);
  }
  const _InternalUlRef = useRef<HTMLUListElement | HTMLOptionElement>();
  const keypressOptions = preventDefault ? optsPreventDefault : opts;
  useKeyPress("ArrowUp", handleArrowUp, keypressOptions);
  useKeyPress("ArrowDown", handleArrowDown, keypressOptions);
  useKeyPress(
    "Enter",
    () => {
      const children = Array.from(_InternalUlRef.current.children);
      const e =
        children.find(
          (x: HTMLElement) => x.dataset.value === highlightedValue
        ) ||
        (children.find(
          (x: HTMLElement) => x.dataset.value === currentValue
        ) as any);
      if (!e) return;
      setCurrentValue && setCurrentValue(e.dataset.value);
    },
    opts
  );
  return (
    <ul
      ref={_util.applyForwardedRef(__ulRef, _InternalUlRef) as any}
      class={classnames._autoCompleteInlineList}
      aria-labelledBy={labelledBy}
    >
      {options.map(({render, value}) => (
        <OptionsValue
          render={render}
          value={value}
          select={select}
          currentValue={currentValue}
          highlightedValue={highlightedValue}
        />
      ))}
    </ul>
  );
}

const __OptionsRenderer = forwardRef<OptionsRendererProps>(
  function OptionsRenderer /** uncontrolled */(
    props: OptionsRendererProps,
    ref
  ) {
    const [highlightedValue, _setHighlightedValue] = useState<string | null>(
      null
    );
    return h(
      _OptionsRenderer,
      _util.extend({__ulRef: ref}, props, {
        highlightedValue,
        _setHighlightedValue,
      })
    );
  }
);
export const OptionsRenderer: typeof __OptionsRenderer & {
  __ControlledHighlightedElement: typeof _OptionsRenderer;
} = __OptionsRenderer as any;
OptionsRenderer.__ControlledHighlightedElement = _OptionsRenderer;
export const AutoCompleteOptions = forwardRef<
  AutoCompleteOptionsRendererProps,
  any
>(function _AutoCompleteOptions(
  {
    options,
    query,
    select,
    containsFunction,
    setQuery,
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
    const {current} = funcRef;
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
        setCurrentValue={setQuery}
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
