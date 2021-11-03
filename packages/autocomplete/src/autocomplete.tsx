import {BaseElement, _util, useIsPending} from "@hydrophobefireman/kit";
import {h, useState} from "@hydrophobefireman/ui-lib";

import {BaseAutoComplete} from "./base-autocomplete";
import {AutoCompleteProps} from "./types";

function DependantAutoComplete(props: BaseElement<AutoCompleteProps>) {
  const {isPending} = useIsPending();
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

export function useAutoComplete(initial?: string) {
  const [value, setValue] = useState(initial || "");
  return {value, setValue};
}
