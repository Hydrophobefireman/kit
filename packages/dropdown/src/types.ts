import { BaseDomProps } from "@hydrophobefireman/kit";
import { RefType } from "@hydrophobefireman/ui-lib";

export interface DropdownProps {
  parent?: HTMLElement;
  visible?: boolean;
  children?: any;
  class?: any;
  className?: any;
  dom?: RefType<HTMLDivElement>;
  style?: BaseDomProps["style"] | null;
}

export interface OffsetRect {
  right: number;
  top: number;
  left: number;
  width: number;
}

export {};
