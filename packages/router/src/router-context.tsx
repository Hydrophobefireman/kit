import { createContext } from "@hydrophobefireman/ui-lib";

import { TransitionRouterContext } from "./types";

export const Ctx = createContext<TransitionRouterContext>({
  params: {},
  path: null,
  pendingTransitionOut: false,
  searchParams: null,
  transitionStyle: null,
} as any);
export function RouterContext(
  props: TransitionRouterContext & { children?: any }
) {
  const { children, ...rest } = props;
  return <Ctx.Provider value={rest as any} children={children} />;
}
