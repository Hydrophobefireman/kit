import { BaseElement, _util, useIsPending } from "@hydrophobefireman/kit";
import * as classnames from "@hydrophobefireman/kit/classnames";
import { Container } from "@hydrophobefireman/kit/container";
import { Input } from "@hydrophobefireman/kit/input";
import { h, useRef, useState } from "@hydrophobefireman/ui-lib";

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
  ...props
}: BaseElement<AutoCompleteProps>) {
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLInputElement>();
  const inputJsx = h(
    mode === "search" ? Input.Search : Input,
    _util.extend(props, { value: query, setValue: setQuery, dom: ref } as any)
  );
  _util.applyRef(props.dom, ref.current);

  return (
    <Container class={containerClass}>
      {inputJsx}
      <div class={classnames.autocompleteOptions}>
        {!isPending && <AutoCompleteOptions options={options} query={query} />}
      </div>
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

export function AutoComplete({
  depends,
  ...props
}: BaseElement<AutoCompleteProps>) {
  if (depends) return h(DependantAutoComplete, props as any);
  return h(BaseAutoComplete, props as any);
}
