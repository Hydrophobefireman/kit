export interface ModalProps {
  active: boolean;
  onDismiss?(): void;
  onAnimationComplete?(): void;
  children?: any;
}
