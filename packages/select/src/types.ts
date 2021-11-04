export interface SelectOptions {
  value: string | number;
  render?(value: string | number): JSX.Element;
}
export interface SelectProps {
  options: SelectOptions[];
  setValue(v: string | number): void;
  label: string;
  buttonClass?: string;
  dropdownClass?: string;
}
