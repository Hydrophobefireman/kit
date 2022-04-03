import {ComplexComponent} from "@hydrophobefireman/kit";

export interface AutoCompleteOptionsProps {
  value: AutoCompleteValue;
  render?(value: AutoCompleteValue): JSX.Element;
}
export interface OptionsRendererProps {
  options: (AutoCompleteOptionsProps & {pos: number})[];
  currentValue: AutoCompleteValue;
  setCurrentValue?(q: AutoCompleteValue): void;
  select: AutoCompleteOptionsRendererProps["select"];
  labelledBy: string;
  size: number;
  preventDefault?: boolean;
  listClass?: string;
  enabled?: boolean;
}

export type AutoCompleteValue = string | number | null;
export interface AutoCompleteOptionsRendererProps {
  options: AutoCompleteOptionsProps[];
  query: AutoCompleteValue;
  setQuery(q: AutoCompleteValue): void;
  select(e: JSX.TargetedMouseEvent<any>): void;
  containsFunction?(a: AutoCompleteValue, b: string): boolean;
  noSuggestions?: JSX.Element | ComplexComponent;
  labelledBy: string;
  ref?: any;
  listClass?: string;
}
