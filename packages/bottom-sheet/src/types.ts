export interface BottomSheetProps {
  active: boolean;
  onDismiss?(): void;
  onAnimationComplete?(): void;
  height?: number | string;
  children?: any;
}
export {};
