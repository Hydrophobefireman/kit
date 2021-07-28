import { BaseDomProps } from "@hydrophobefireman/kit";

export interface GenericContainerProps {
  row?: boolean;
  flex?: number | string;
  horizontal?: "left" | "right" | "center";
  vertical?: "top" | "center" | "bottom";
}
export type ContainerProps = Omit<
  BaseDomProps,
  "block" | "inlineBlock" | "flex" | "inlineFlex" | "grid"
> &
  GenericContainerProps;

export {};
