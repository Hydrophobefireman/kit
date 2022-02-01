import {ComplexComponent} from "@hydrophobefireman/kit";
import {
  AutoCompleteOptionsProps,
  AutoCompleteValue,
} from "@hydrophobefireman/kit/_autocomplete-options";
import {InputProps} from "@hydrophobefireman/kit/input";
import {RefType} from "@hydrophobefireman/ui-lib";

export interface AutoCompleteInputProps extends AutoCompleteProps {
  expanded?: boolean;
  setDirty(d: boolean): void;
  setQuery(q: any): void;
  optionRef: RefType<any>;
  setValueRef: RefType<(v: any) => void>;
}
export interface AutoCompleteProps extends Omit<InputProps, "value"> {
  value: AutoCompleteValue;
  setValue(n: AutoCompleteValue | any): void;
  onChange?(value: AutoCompleteProps): void;
  options: AutoCompleteOptionsProps[];
  mode?: "search" | "normal";
  itemRender?(value: AutoCompleteValue): JSX.Element;
  containerClass?: string;
  isPending?: boolean;
  noSuggestions?: JSX.Element | ComplexComponent;
  dropdownClass?: string;
  listClass?: string;
  preserveOpenOnClick?: boolean;
}

export {};
