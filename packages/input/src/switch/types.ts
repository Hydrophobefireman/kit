export interface SwitchProps {
  state: "enabled" | "disabled" | "intermediate";
  labelClass?: string;
  errored?: boolean;
  inline?: boolean;
  label: string;
  labelStyle?: any;
  width?: string;
  height?: string;
}
export {};
