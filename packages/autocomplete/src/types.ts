import { InputProps } from "@hydrophobefireman/kit/input";

export type AutoCompleteValue = string | number | null | undefined;
export interface AutoCompleteOptions {
  value: AutoCompleteValue;
  render?(value: AutoCompleteValue): JSX.Element;
}
export interface AutoCompleteOptionsRendererProps {
  options: AutoCompleteOptions[];
  query: string;
  containsFunction?(a: AutoCompleteValue, b: string): boolean;
}

export interface AutoCompleteProps extends InputProps {
  value?: AutoCompleteValue;
  onChange?(value: AutoCompleteProps): void;
  options: AutoCompleteOptions[];
  mode?: "search" | "normal";
  itemRender?(value: AutoCompleteValue): JSX.Element;
  containerClass?: string;
  isPending?: boolean;
}
export {};
