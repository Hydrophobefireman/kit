export type Theme = "dark" | "light";

export interface ThemeListener {
  (newTheme: Theme): void;
}

export {};
