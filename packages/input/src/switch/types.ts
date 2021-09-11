export interface SwitchProps {
  state: "enabled" | "disabled" | "intermediate";
  labelClass?: string;
  errored?: boolean;
  inline?: boolean;
}
export {};
