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
import {__BLANK__, clean, contains} from "./util";

const win = typeof window !== "undefined" ? window : (null as any);
const opts = {target: win};
const optsPreventDefault = _util.extend({passive: false}, opts);

_util.scrollIntoViewIfNeededPolyfill();
function OptionsValue({
  render,
  value,
  select,
  size,
  pos,
  currentValue,
  highlightedValue,
}: AutoCompleteOptionsProps & {
  size: number;
  pos: number;
  select(e: any): void;
  currentValue: AutoCompleteValue;
  highlightedValue: string | null;
}) {
  const ariaSelected = currentValue === value;
  return (
    <li
      role="option"
      tabIndex={-1}
      onClick={select}
      data-value={value}
      aria-posinset={pos}
      aria-setsize={size}
      aria-selected={ariaSelected}
      data-active={String(ariaSelected || highlightedValue === value)}
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
  size,
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
  // useMount(() => {
  //   const listParent = _InternalUlRef.current;
  //   if (listParent) {
  //     _util.buildRaf(
  //       _util.buildRaf(() => {
  //         const children = Array.from(listParent.children);
  //         const c = children.find(
  //           (x: HTMLElement) => x.dataset.value === currentValue
  //         );
  //         if (c) (c as any).scrollIntoViewIfNeeded();
  //       })
  //     );
  //   }
  // });

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
    let $_highlightedCurr: number = 0;
    let elWithArrowFocus = children.find((x, i) => {
      // store the index in $curr
      // so that we don't have to do an indexOf
      $_highlightedCurr = i;
      const v = x.dataset.value;
      return v === highlightedValue;
    });

    return {children, activeChild: elWithArrowFocus, $curr: $_highlightedCurr};
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
      return setHighlightedValue(__BLANK__);
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
      return setHighlightedValue(__BLANK__);
    }
    setHighlightedValue(children[$curr + 1]);
  }
  const _InternalUlRef = useRef<HTMLUListElement | HTMLOptionElement>();
  const keypressOptions = preventDefault ? optsPreventDefault : opts;
  const commonRef = _util.useSyncedRefs(__ulRef, _InternalUlRef);
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
      ref={commonRef as any}
      class={classnames._autoCompleteInlineList}
      aria-labelledBy={labelledBy}
    >
      {options.filter(Boolean).map((x) => (
        <OptionsValue
          size={size}
          pos={x.pos}
          render={x.render}
          value={x.value}
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
  const getAllAsFiltered = () =>
    options.map((x, i) => _util.extend({}, x, {pos: i + 1}));
  query = query || "";
  const funcRef = useRef<(a: AutoCompleteValue, b: string) => boolean>();
  funcRef.current = containsFunction || contains;
  const [filteredOptions, setFilteredOptions] =
    useState<(AutoCompleteOptionsProps & {pos: number})[]>(getAllAsFiltered);
  useEffect(() => {
    const {current: filterFunc} = funcRef;
    if (!options || !options.length) return setFilteredOptions([]);
    if (filterFunc === contains && !clean(query))
      return setFilteredOptions(getAllAsFiltered);
    const filtered = options.map((x, i) => {
      if (filterFunc(x.value, query as any)) {
        return _util.extend({}, x, {post: i + 1});
      }
      return null as any;
    });
    setFilteredOptions(filtered);
  }, [query, options, containsFunction]);

  return filteredOptions.length ? (
    <div class={classnames.autocompleteOptions} ref={ref}>
      <OptionsRenderer
        labelledBy={labelledBy}
        options={filteredOptions}
        size={options.length}
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
