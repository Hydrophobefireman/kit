export interface InputProps {
  variant?: "standard" | "material";
  errored?: boolean;
  size?: "default" | "small" | "large";
  wrapperClass?: string;
  labelClass?: string;
  class?: string;
  className?: string;
  value?: string | number;
  setValue?(val: any): void;
  helperText?: string;
}

export {};
