import {Properties} from "csstype";

import {ComplexComponent} from "@hydrophobefireman/kit";

export interface RouteComponentProps {
  render: ComplexComponent;
}

export interface DynamicComponentProps {
  fallback?: ComplexComponent;
  errorFallback?: (error: Error) => JSX.Element;
  unsafe?: boolean;
}

interface RouterContext {
  params: Record<string, string>;
  path: string;
  searchParams: URLSearchParams;
}
export interface TransitionRouterContext extends RouterContext {
  pendingTransitionOut: boolean;
  transitionStyle: Properties;
}
export type TransitionPath = (
  | {component: ComplexComponent}
  | {jsx: JSX.Element}
) & {
  preload?(): Promise<any>;
  fallback?: ComplexComponent;
  loading?: ComplexComponent;
};
export interface TransitionManagerProps {
  child: TransitionPath;
  path: any;
  params: Record<string, string>;
  transitionStyle: Properties;
  commonFallback?: any;
}

export interface RouterProps {
  fallbackComponent?: ComplexComponent;
  NotFoundComponent?: ComplexComponent;
  paths: RouterPaths;
  transitionStyle?: Properties;
  inMemoryRouter?: boolean;
}

export type RouterPaths = Record<
  string,
  TransitionPath | ComplexComponent | JSX.Element
>;

export interface Preloader {
  (): Promise<ComplexComponent | {default: ComplexComponent}>;
}
