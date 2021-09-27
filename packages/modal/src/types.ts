import { RefType } from "@hydrophobefireman/ui-lib";

export interface ModalProps {
  active: boolean;
  onDismiss?(): void;
  onAnimationComplete?(): void;
  children?: any;
  _setDom?(d: HTMLDivElement): void;
  onClickOutside?(): void;
}
