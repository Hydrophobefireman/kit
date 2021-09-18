export interface ToastOptions {
  content?: string | JSX.Element;
  type?: "alert" | "error" | "success";
  actionText?: string | JSX.Element;
  cancelText?: string | JSX.Element;
  time?: number;
  onActionClick?(e: JSX.TargetedMouseEvent<HTMLButtonElement>): void;
  onCancelClick?(e: JSX.TargetedMouseEvent<HTMLButtonElement>): void;
  preventClose?: boolean;
}
export {};
