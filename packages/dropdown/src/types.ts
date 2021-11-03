import {BaseDomProps} from "@hydrophobefireman/kit";
import {RefType} from "@hydrophobefireman/ui-lib";

export interface DropdownProps {
  parent: RefType<HTMLElement>;
  sibling: RefType<HTMLElement>;
  children?: any;
  class?: any;
  className?: any;
  style?: BaseDomProps["style"] | null;
}

export {};
