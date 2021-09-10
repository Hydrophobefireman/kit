export interface CheckboxProps {
  checked: boolean;
  onCheck(e: boolean): void;
  boxClass?: any;
  boxStyle?: any;
  children?: any;
  errored?: boolean;
  inline?: boolean;
}
export {};
