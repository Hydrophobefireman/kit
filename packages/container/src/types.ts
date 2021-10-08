import { BaseDomProps } from "@hydrophobefireman/kit";
import { RefType } from "@hydrophobefireman/ui-lib";

export interface GenericContainerProps {
  row?: boolean;
  flex?: number | string;
  horizontal?: "left" | "right" | "center";
  vertical?: "top" | "center" | "bottom";
}
export type ContainerProps = Omit<
  BaseDomProps,
  "block" | "inlineBlock" | "flex" | "grid" | "inline"
> &
  GenericContainerProps;

export type InternalContainerProps = ContainerProps & { __$ref: RefType<any> };
export {};
