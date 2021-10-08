import { Properties } from "csstype";

import { RefType } from "@hydrophobefireman/ui-lib";

/**
 * @see https://stackoverflow.com/questions/51465182/how-to-remove-index-signature-using-mapped-types/66252656#66252656
 */
// remap the keys since we don't want the generic index here, might cause
// issues with custom elements, but that's more than rare and we can always use
// `any` for 1  element instead of having no type checking for all
type RemoveIndex<T> = {
  [P in keyof T as string extends P
    ? never
    : number extends P
    ? never
    : P extends "symbol"
    ? never
    : P extends "object"
    ? never
    : P]: T[P];
};
export type DOMElements = keyof RemoveIndex<JSX.IntrinsicElements>;

type BaseDomDisplayProps =
  | "block"
  | "inline"
  | "inlineBlock"
  | "flex"
  | "inlineFlex"
  | "grid"
  | "none";

export type DOMClass = any;
export interface _BaseDomProps {
  element?: DOMElements | ComplexComponent;
  block?: boolean;
  inline?: boolean;
  inlineBlock?: boolean;
  flex?: boolean;
  inlineFlex?: boolean;
  grid?: boolean;
  none?: boolean;
  class?: DOMClass;
  className?: DOMClass;
  depends?: boolean;
  skeleton?(resource: any): any;
  children?: any;
  style?: Properties & { [k: string]: any };
  ref?: any;
}

export type ElementProps = Omit<
  JSX.HTMLAttributes<HTMLElement>,
  keyof _BaseDomProps
>;
export type BaseDomProps = Partial<ElementProps & _BaseDomProps>;

export type BaseClass = string | number;

export type OptionalPick<T, K extends keyof T> = {
  [P in K]?: T[P];
};

export type BaseElement<T> = Omit<
  BaseDomProps,
  "element" | BaseDomDisplayProps | keyof T
> &
  T;

type Renderable = JSX.Element | string | number | boolean;

interface ClassComponentProto {
  render(props: any, state: any): Renderable;
}
interface ClassComponent {
  new (props: any, state: any);
  readonly prototype: ClassComponentProto;
}

type FunctionalCompnent = (props: any) => Renderable;
export type ComplexComponent = FunctionalCompnent | ClassComponent;

export type KitColors =
  | "kit-background"
  | "kit-shade-1"
  | "kit-shade-2"
  | "kit-shade-3"
  | "kit-shade-4"
  | "kit-shade-5"
  | "kit-shade-6"
  | "kit-shade-7"
  | "kit-shade-8"
  | "kit-foreground"
  | "kit-error-lightest"
  | "kit-error-light"
  | "kit-error"
  | "kit-error-dark"
  | "kit-selection"
  | "kit-success-lightest"
  | "kit-success-light"
  | "kit-success"
  | "kit-success-dark"
  | "kit-warning-lightest"
  | "kit-warning-light"
  | "kit-warning"
  | "kit-warning-dark"
  | "kit-violet-lightest"
  | "kit-violet-light"
  | "kit-violet"
  | "kit-violet-dark"
  | "kit-cyan-lightest"
  | "kit-cyan-light"
  | "kit-cyan"
  | "kit-cyan-dark"
  | "kit-highlight-purple"
  | "kit-highlight-magenta"
  | "kit-highlight-pink"
  | "kit-highlight-yellow";

export {};
