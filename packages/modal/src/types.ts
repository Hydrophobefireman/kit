export interface ModalProps {
  active: boolean;
  onAnimationComplete?(): void;
  children?: any;
  _setDom?(d: HTMLDivElement): void;
  onClickOutside?(e: JSX.TargetedMouseEvent<HTMLElement>): void;
  onEscape?(e: JSX.TargetedKeyboardEvent<HTMLElement>): void;
  noTransition?: boolean;
  class?: string;
  className?: string;
}
