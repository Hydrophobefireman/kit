export interface ModalProps {
  active: boolean;
  onDismiss?(): void;
  onAnimationComplete?(): void;
  children?: any;
  _setDom?(d: HTMLDivElement): void;
  onClickOutside?(e: JSX.TargetedMouseEvent<HTMLElement>): void;
  onEscape?(e: JSX.TargetedKeyboardEvent<HTMLElement>): void;
  noTransition?: boolean;
}
