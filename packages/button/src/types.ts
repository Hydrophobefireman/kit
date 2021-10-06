export interface ButtonProps {
  foreground?: string;
  background?: string;
  mode?: "secondary" | "success" | "error" | "warning" | "alert" | "voilet";
  label: string;
  prefix?: any;
  suffix?: any;
  variant?: "shadow" | "normal" | "custom";
  href?: string;
  preserveScroll?: boolean;
  innerContentClass?: any;
  prefixClass?: any;
  suffixClass?: any;
}

export {};
