import { InputProps } from "@hydrophobefireman/kit/input";

export type AutoCompleteValue = string | number | null;
export interface AutoCompleteOptions {
  value: AutoCompleteValue;
  render?(value: AutoCompleteValue): JSX.Element;
}
export interface AutoCompleteOptionsRendererProps {
  options: AutoCompleteOptions[];
  query: string;
  select(e: JSX.TargetedMouseEvent<any>): void;
  containsFunction?(a: AutoCompleteValue, b: string): boolean;
}

export interface AutoCompleteProps extends Omit<InputProps, "value"> {
  value?: AutoCompleteValue;
  onChange?(value: AutoCompleteProps): void;
  options: AutoCompleteOptions[];
  mode?: "search" | "normal";
  itemRender?(value: AutoCompleteValue): JSX.Element;
  containerClass?: string;
  isPending?: boolean;
  __depends?: boolean;
}
export interface OptionsRendererProps {
  options: AutoCompleteOptions[];
  currentValue: AutoCompleteValue;
  select: AutoCompleteOptionsRendererProps["select"];
}
export {};