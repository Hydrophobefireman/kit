import { ComplexComponent } from "@hydrophobefireman/kit";
import { InputProps } from "@hydrophobefireman/kit/input";
import { RefType } from "@hydrophobefireman/ui-lib";

export type AutoCompleteValue = string | number | null;
export interface AutoCompleteOptionsProps {
  value: AutoCompleteValue;
  render?(value: AutoCompleteValue): JSX.Element;
}
export interface AutoCompleteOptionsRendererProps {
  options: AutoCompleteOptionsProps[];
  query: AutoCompleteValue;
  select(e: JSX.TargetedMouseEvent<any>): void;
  containsFunction?(a: AutoCompleteValue, b: string): boolean;
  noSuggestions?: JSX.Element | ComplexComponent;
  labelledBy: string;
  ref?: any;
}
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
}
export interface OptionsRendererProps {
  options: AutoCompleteOptionsProps[];
  currentValue: AutoCompleteValue;
  select: AutoCompleteOptionsRendererProps["select"];
  labelledBy: string;
}
export {};
