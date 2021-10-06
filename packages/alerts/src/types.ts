export interface ToastOptions {
  content?: string | JSX.Element;
  type?: "alert" | "error" | "success";
  actionText?: string | JSX.Element;
  cancelText?: string | JSX.Element;
  time?: number;
  onActionClick?(e: JSX.TargetedMouseEvent<HTMLButtonElement>): void;
  onCancelClick?(e: JSX.TargetedMouseEvent<HTMLButtonElement>): void;
  preventClose?: boolean;
  mask?: boolean;
}
export interface BaseSnackbarProps {
  x: ToastOptions;
  isActive?: boolean;
  i: number;
  pop(x: ToastOptions): void;
  alertStack: Map<ToastOptions, boolean>;
  remove(x: ToastOptions): void;
}
export {};
