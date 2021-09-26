import type { Property } from "csstype";

import { KitColors } from "@hydrophobefireman/kit";

export type TextAs =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "small"
  | "span"
  | "div"
  | "label"
  | "em"
  | "b"
  | "i"
  | "u"
  | "strong";

export type TextSize =
  | number
  | `${string}${
      | "em"
      | "ex"
      | "%"
      | "px"
      | "cm"
      | "mm"
      | "in"
      | "pt"
      | "pc"
      | "rem"
      | "vh"
      | "vw"
      | "vmin"
      | "vmax"
      | "ch"}`;
export type FontWeight = Property.FontWeight;
export type TextTransform = "capitalize" | "uppercase" | "lowercase";
export interface TextProps {
  as?: TextAs;
  size?: TextSize;
  align?: "left" | "center" | "right";
  weight?: FontWeight;
  transform?: TextTransform;
  color?: KitColors;
  noMargin?: boolean;
}
export {};
