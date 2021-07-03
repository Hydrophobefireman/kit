import { Properties } from "csstype";
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

export type DOMClass = any;
interface _BaseDomProps {
  element?: DOMElements;
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
  dom?: { current: any };
  skeleton?(resource: any): any;
  children?: any;
  style?: Properties;
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

export type BaseElement<T> = Omit<BaseDomProps, "element" | keyof T> & T;

type Renderable = JSX.Element | string | number | boolean;
interface ClassComponent {
  new (props: any, state: any);
  render(props: any, state: any): Renderable;
}
type FunctionalCompnent = (props: any) => Renderable;
export type ComplexComponent = FunctionalCompnent | ClassComponent;

export {};
