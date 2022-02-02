import {_util} from "@hydrophobefireman/kit";
import {useState} from "@hydrophobefireman/ui-lib";

export {AutoComplete} from "./base-autocomplete";

export function useAutoComplete(initial?: string) {
  const [value, setValue] = useState(initial || "");
  return {value, setValue};
}
